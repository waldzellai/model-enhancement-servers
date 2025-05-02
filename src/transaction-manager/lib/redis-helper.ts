import { Redis, RedisOptions } from 'ioredis';
import chalk from 'chalk';

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  console.error(chalk.red('Error: REDIS_URL environment variable is not set.'));
  process.exit(1);
}

const redisOptions: RedisOptions = {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  retryStrategy(times: number): number | null {
    const delay = Math.min(times * 50, 2000); // Exponential backoff capped at 2s
    console.warn(chalk.yellow(`Redis connection lost. Retrying in ${delay}ms... (Attempt ${times})`));
    return delay;
  },
};

export const redisClient = new Redis(REDIS_URL, redisOptions);

redisClient.on('connect', () => {
  console.log(chalk.green('Connected to Redis server.'));
});

redisClient.on('ready', () => {
  console.log(chalk.cyan('Redis client is ready.'));
});

redisClient.on('error', (err: Error) => {
  console.error(chalk.red('Redis client error:'), err);
  // Depending on the error, you might want to implement more specific handling
  // For critical errors (like auth failure), you might want to exit.
  // if (err.message.includes('AUTH')) { process.exit(1); }
});

redisClient.on('close', () => {
  console.log(chalk.magenta('Redis connection closed.'));
});

redisClient.on('reconnecting', (timeToReconnect: number) => {
  console.log(chalk.yellow(`Redis reconnecting in ${timeToReconnect}ms...`));
});

redisClient.on('end', () => {
  console.log(chalk.gray('Redis client connection has ended. (No more reconnections will be attempted)'));
});

// Wrapper functions for common operations with error handling

/**
 * Set a key with a value and an expiry time (TTL) in seconds.
 * Handles JSON serialization.
 */
export async function setWithTTL(key: string, value: unknown, ttlSeconds: number): Promise<boolean> {
  try {
    const serializedValue = JSON.stringify(value);
    const result = await redisClient.set(key, serializedValue, 'EX', ttlSeconds);
    return result === 'OK';
  } catch (error) { // Catch Redis errors and serialization errors
    console.error(chalk.red(`Error setting key ${key} with TTL ${ttlSeconds}s:`), error);
    return false;
  }
}

/**
 * Get the value of a key. Handles JSON deserialization.
 * Returns null if key doesn't exist or on error.
 */
export async function get(key: string): Promise<unknown | null> {
  try {
    const result = await redisClient.get(key);
    if (result === null) {
      return null; // Key doesn't exist or expired
    }
    return JSON.parse(result);
  } catch (error) { // Catch Redis errors and deserialization errors
    console.error(chalk.red(`Error getting key ${key}:`), error);
    return null;
  }
}

/**
 * Delete a key.
 * Returns the number of keys deleted (0 or 1).
 */
export async function del(key: string): Promise<number> {
  try {
    return await redisClient.del(key);
  } catch (error) {
    console.error(chalk.red(`Error deleting key ${key}:`), error);
    return 0; // Indicate failure
  }
}

/**
 * Set the expiry time (TTL) in seconds for an existing key.
 */
export async function expire(key: string, ttlSeconds: number): Promise<boolean> {
  try {
    const result = await redisClient.expire(key, ttlSeconds);
    return result === 1;
  } catch (error) {
    console.error(chalk.red(`Error setting expiry for key ${key}:`), error);
    return false;
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log(chalk.blue('\nGracefully shutting down Redis client...'));
  await redisClient.quit();
  console.log(chalk.blue('Redis client disconnected.'));
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log(chalk.blue('Received SIGTERM. Gracefully shutting down Redis client...'));
  await redisClient.quit();
  console.log(chalk.blue('Redis client disconnected.'));
  process.exit(0);
});

import { Redis } from 'ioredis';
export declare const redisClient: Redis;
/**
 * Set a key with a value and an expiry time (TTL) in seconds.
 * Handles JSON serialization.
 */
export declare function setWithTTL(key: string, value: unknown, ttlSeconds: number): Promise<boolean>;
/**
 * Get the value of a key. Handles JSON deserialization.
 * Returns null if key doesn't exist or on error.
 */
export declare function get(key: string): Promise<unknown | null>;
/**
 * Delete a key.
 * Returns the number of keys deleted (0 or 1).
 */
export declare function del(key: string): Promise<number>;
/**
 * Set the expiry time (TTL) in seconds for an existing key.
 */
export declare function expire(key: string, ttlSeconds: number): Promise<boolean>;

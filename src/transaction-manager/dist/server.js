import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { z } from 'zod';
import chalk from 'chalk';
import { v4 as uuidv4 } from 'uuid';
import { setWithTTL, get, del, expire } from './lib/redis-helper.js';
// -- Zod Schema for Input Validation --
const TxnRequestSchema = z.object({
    action: z.enum(['start', 'resume', 'close']),
    token: z.string().optional(),
    payload: z.any().optional(), // Keep as any for flexibility
    ttlSeconds: z.number().int().positive().optional(),
});
// -- Constants (unchanged) --
const DEFAULT_TTL_SECONDS = 3600; // 1 hour
const MAX_TTL_SECONDS = 86400; // 24 hours
const TOKEN_PREFIX = 'txn:';
// -- Helper Functions (unchanged) --
function generateToken() {
    return TOKEN_PREFIX + uuidv4();
}
function calculateExpiry(ttlSeconds) {
    return new Date(Date.now() + ttlSeconds * 1000).toISOString();
}
// -- Main Handler Logic (Refactored) --
async function handleTransactionCallback(args) {
    const { action, token: requestToken, payload, ttlSeconds: requestTtl } = args;
    let effectiveTtl = Math.min(requestTtl ?? DEFAULT_TTL_SECONDS, MAX_TTL_SECONDS);
    if (effectiveTtl <= 0)
        effectiveTtl = DEFAULT_TTL_SECONDS;
    try {
        let responsePayload;
        switch (action) {
            case 'start': {
                // Validation (moved from generic handler)
                if (requestToken) {
                    throw new McpError(ErrorCode.InvalidParams, 'Token should not be provided for the "start" action.');
                }
                const newToken = generateToken();
                const setResult = await setWithTTL(newToken, payload ?? {}, effectiveTtl);
                if (!setResult)
                    throw new Error('Failed to set initial state in Redis.');
                responsePayload = {
                    status: 'pending',
                    token: newToken,
                    payload: payload ?? {},
                    expiresAt: calculateExpiry(effectiveTtl),
                };
                break;
            }
            case 'resume': {
                if (!requestToken) {
                    // This validation is technically covered by McpServer if schema requires it,
                    // but explicit check remains useful if schema makes token optional.
                    throw new McpError(ErrorCode.InvalidParams, 'Token is required for the "resume" action.');
                }
                const currentPayload = await get(requestToken);
                if (currentPayload === null) {
                    throw new McpError(ErrorCode.InvalidParams, `Transaction token "${requestToken}" not found or expired.`);
                }
                let finalPayload = currentPayload;
                if (payload !== undefined) {
                    await setWithTTL(requestToken, payload, effectiveTtl);
                    finalPayload = payload;
                }
                else {
                    await expire(requestToken, effectiveTtl);
                }
                responsePayload = {
                    status: 'pending',
                    token: requestToken,
                    payload: finalPayload,
                    expiresAt: calculateExpiry(effectiveTtl),
                };
                break;
            }
            case 'close': {
                if (!requestToken) {
                    throw new McpError(ErrorCode.InvalidParams, 'Token is required for the "close" action.');
                }
                const deleteResult = await del(requestToken);
                if (deleteResult === 0) {
                    console.warn(chalk.yellow(`Attempted to close non-existent or already closed token: ${requestToken}`));
                }
                responsePayload = {
                    status: 'closed',
                    token: requestToken,
                    payload: undefined,
                    expiresAt: null,
                };
                break;
            }
            // No default needed as zod schema handles invalid actions
        }
        // Return successful result
        return {
            content: [{ type: 'text', text: JSON.stringify(responsePayload) }]
        };
    }
    catch (error) {
        console.error(chalk.red('Error handling transaction:'), error);
        // Return error result
        const errorPayload = {
            status: 'error',
            token: requestToken ?? 'unknown',
            error: error instanceof McpError ? error.message : (error.message || 'An unexpected server error occurred.'),
            expiresAt: null,
        };
        const errorMessage = errorPayload.error;
        return {
            content: [{
                    type: 'text',
                    text: JSON.stringify(errorPayload)
                }, {
                    type: 'text', // Also include plain text error
                    text: errorMessage ?? 'Unknown error' // Ensure text is always string
                }],
            isError: true,
        };
    }
}
// -- Server Initialization (Refactored) --
export async function runServer() {
    const mcpServer = new McpServer({
        name: 'transaction-manager',
        version: '0.1.1', // Updated version
    });
    // Register the single tool
    mcpServer.tool("transaction", "Manages simple stateful transactions (start, resume, close)", TxnRequestSchema.shape, // Pass the shape for Zod validation
    handleTransactionCallback);
    // Connect using stdio
    const transport = new StdioServerTransport();
    try {
        await mcpServer.connect(transport);
        console.error(chalk.green('Transaction Manager MCP Server running on stdio.')); // Use console.error for logs
    }
    catch (error) {
        console.error(chalk.red('Failed to connect Transaction Manager server:'), error);
        process.exit(1);
    }
}
// Optional: Add main execution block if this file is run directly
// Example using yargs (ensure yargs is installed and imported)
/*
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

if (require.main === module) { // Check if running as main script
  const argv = yargs(hideBin(process.argv))
    .parseSync();

  runServer().catch((error) => {
    console.error(chalk.red("Fatal error running server:"), error);
    process.exit(1);
  });
}
*/
//# sourceMappingURL=server.js.map
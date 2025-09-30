import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerAllTools } from './tools/index.js';
import { setupTracing } from './observability/trace.js';
import { z } from 'zod';

// Define session configuration schema (optional - this server doesn't need config)
export const configSchema = z.object({});

// Export createServer function for Smithery CLI
export default function createServer({
  config,
}: {
  config: z.infer<typeof configSchema>;
}) {
  const mcpServer = new McpServer({
    name: 'mcp-pewter-zero',
    version: '0.1.0',
  });

  const trace = setupTracing();
  registerAllTools({ trace, registerTool: mcpServer.tool.bind(mcpServer) });

  return mcpServer;
}
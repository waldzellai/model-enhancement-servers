import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerAllTools } from './tools/index.js';
import { setupTracing } from './observability/trace.js';
import chalk from 'chalk';

async function runServer() {
  const mcpServer = new McpServer({
    name: 'mcp-pewter-zero',
    version: '0.1.0',
  });

  const trace = setupTracing();
  registerAllTools({ trace, registerTool: mcpServer.tool.bind(mcpServer) });

  const transport = new StdioServerTransport();
  try {
    await mcpServer.connect(transport);
    console.error(chalk.green('MCP Pewter Zero server running on stdio.'));
  } catch (error) {
    console.error(chalk.red('Failed to connect MCP Pewter Zero server:'), error);
    process.exit(1);
  }
}

runServer().catch((err) => {
  console.error(chalk.red('Fatal error running server:'), err);
  process.exit(1);
});
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import chalk from "chalk";

const PingArgs = z.object({
  message: z.string().default("ping"),
});

async function handlePing(args: z.infer<typeof PingArgs>) {
  return {
    content: [
      { type: "text", text: JSON.stringify({ echo: args.message, ok: true }) },
    ],
  };
}

export async function runServer(): Promise<void> {
  const server = new McpServer({ name: "mcp-glass-scrolls", version: "0.0.1" });

  server.tool("ping", "Echo a message (healthcheck)", PingArgs.shape, handlePing);

  const transport = new StdioServerTransport();
  try {
    await server.connect(transport);
    console.error(chalk.green("[or-server] ready"));
  } catch (err) {
    console.error(chalk.red("[or-server] failed to start"), err);
    process.exit(1);
  }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  runServer().catch((err) => {
    console.error(chalk.red("[or-server] fatal"), err);
    process.exit(1);
  });
}
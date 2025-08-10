#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema, CallToolRequest } from "@modelcontextprotocol/sdk/types.js";

type Result = { content: Array<{ type: "text"; text: string }>; isError?: boolean };

interface BiasDetectionInput {
  text: string;
}

const BIAS_WORDS = ["always", "never", "obviously", "clearly", "everyone", "no one"];

function detectBias(text: string): string[] {
  const lower = text.toLowerCase();
  return BIAS_WORDS.filter(w => lower.includes(w));
}

const BIAS_DETECTION_TOOL = {
  name: "biasDetection",
  description: "Detects simplistic biased terms in text",
  inputSchema: {
    type: "object",
    properties: {
      text: { type: "string", description: "Text to analyze for bias" }
    },
    required: ["text"]
  }
};

class BiasDetectionServer {
  async process(input: unknown): Promise<Result> {
    const data = input as BiasDetectionInput;
    if (!data.text || typeof data.text !== "string") {
      return { content: [{ type: "text", text: "Invalid input" }], isError: true };
    }
    const biases = detectBias(data.text);
    return {
      content: [{ type: "text", text: JSON.stringify({ biases }) }]
    };
  }
}

const server = new Server({ name: "bias-detection-server", version: "0.1.0" }, { capabilities: { tools: {} } });
const biasServer = new BiasDetectionServer();

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: [BIAS_DETECTION_TOOL] }));
server.setRequestHandler(CallToolRequestSchema, async (req: CallToolRequest) => {
  if (req.params.name === "biasDetection") {
    return await biasServer.process(req.params.arguments);
  }
  return { content: [{ type: "text", text: `Unknown tool: ${req.params.name}` }], isError: true };
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Bias Detection MCP Server running on stdio");
}

runServer().catch(err => {
  console.error("Fatal error running server:", err);
  process.exit(1);
});

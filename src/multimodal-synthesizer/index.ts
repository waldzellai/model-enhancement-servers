#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema, CallToolRequest } from "@modelcontextprotocol/sdk/types.js";

type Result = { content: Array<{ type: "text"; text: string }>; isError?: boolean };

interface MultimodalInput {
  text: string[];
  images: string[];
}

function synthesize(data: MultimodalInput) {
  return {
    summary: `${data.text.join(' ')} | Images: ${data.images.join(', ')}`
  };
}

const MULTIMODAL_SYNTH_TOOL = {
  name: "multimodalSynth",
  description: "Combines text and image descriptions into a unified summary",
  inputSchema: {
    type: "object",
    properties: {
      text: { type: "array", items: { type: "string" } },
      images: { type: "array", items: { type: "string" } }
    },
    required: ["text", "images"]
  }
};

class MultimodalSynthServer {
  async process(input: unknown): Promise<Result> {
    const data = input as MultimodalInput;
    if (!Array.isArray(data.text) || !Array.isArray(data.images)) {
      return { content: [{ type: "text", text: "Invalid input" }], isError: true };
    }
    const result = synthesize(data);
    return { content: [{ type: "text", text: JSON.stringify(result) }] };
  }
}

const server = new Server({ name: "multimodal-synthesizer-server", version: "0.1.0" }, { capabilities: { tools: {} } });
const synthServer = new MultimodalSynthServer();

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: [MULTIMODAL_SYNTH_TOOL] }));
server.setRequestHandler(CallToolRequestSchema, async (req: CallToolRequest) => {
  if (req.params.name === "multimodalSynth") {
    return await synthServer.process(req.params.arguments);
  }
  return { content: [{ type: "text", text: `Unknown tool: ${req.params.name}` }], isError: true };
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Multimodal Synthesizer MCP Server running on stdio");
}

runServer().catch(err => {
  console.error("Fatal error running server:", err);
  process.exit(1);
});

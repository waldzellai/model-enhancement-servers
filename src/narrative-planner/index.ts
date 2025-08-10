#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema, CallToolRequest } from "@modelcontextprotocol/sdk/types.js";

type Result = { content: Array<{ type: "text"; text: string }>; isError?: boolean };

interface NarrativeInput {
  premise: string;
  characters: string[];
  arcs: string[];
}

function planNarrative(data: NarrativeInput) {
  return {
    setup: data.premise,
    conflicts: data.arcs,
    resolution: `Characters ${data.characters.join(', ')} resolve the plot.`
  };
}

const NARRATIVE_PLANNER_TOOL = {
  name: "narrativePlanner",
  description: "Generates a simple three-act story outline",
  inputSchema: {
    type: "object",
    properties: {
      premise: { type: "string" },
      characters: { type: "array", items: { type: "string" } },
      arcs: { type: "array", items: { type: "string" } }
    },
    required: ["premise", "characters", "arcs"]
  }
};

class NarrativePlannerServer {
  async process(input: unknown): Promise<Result> {
    const data = input as NarrativeInput;
    if (!data.premise || !Array.isArray(data.characters) || !Array.isArray(data.arcs)) {
      return { content: [{ type: "text", text: "Invalid input" }], isError: true };
    }
    const outline = planNarrative(data);
    return { content: [{ type: "text", text: JSON.stringify(outline) }] };
  }
}

const server = new Server({ name: "narrative-planner-server", version: "0.1.0" }, { capabilities: { tools: {} } });
const narrativeServer = new NarrativePlannerServer();

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: [NARRATIVE_PLANNER_TOOL] }));
server.setRequestHandler(CallToolRequestSchema, async (req: CallToolRequest) => {
  if (req.params.name === "narrativePlanner") {
    return await narrativeServer.process(req.params.arguments);
  }
  return { content: [{ type: "text", text: `Unknown tool: ${req.params.name}` }], isError: true };
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Narrative Planner MCP Server running on stdio");
}

runServer().catch(err => {
  console.error("Fatal error running server:", err);
  process.exit(1);
});

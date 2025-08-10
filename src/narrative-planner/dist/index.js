#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema } from "@modelcontextprotocol/sdk/types.js";
function planNarrative(data) {
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
    async process(input) {
        const data = input;
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
server.setRequestHandler(CallToolRequestSchema, async (req) => {
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
//# sourceMappingURL=index.js.map
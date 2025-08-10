#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema, CallToolRequest } from "@modelcontextprotocol/sdk/types.js";

type Result = { content: Array<{ type: "text"; text: string }>; isError?: boolean };

interface GoalInput {
  action: "add" | "complete" | "status";
  goal?: string;
}

interface GoalState {
  goal: string;
  completed: boolean;
}

class GoalTracker {
  private goals: GoalState[] = [];

  handle(input: GoalInput): Result {
    switch (input.action) {
      case "add":
        if (input.goal) this.goals.push({ goal: input.goal, completed: false });
        break;
      case "complete":
        const g = this.goals.find(x => x.goal === input.goal);
        if (g) g.completed = true;
        break;
      case "status":
        break;
    }
    return { content: [{ type: "text", text: JSON.stringify({ goals: this.goals }) }] };
  }
}

const GOAL_TRACKER_TOOL = {
  name: "goalTracker",
  description: "Adds goals, marks completion, and reports status",
  inputSchema: {
    type: "object",
    properties: {
      action: { type: "string", enum: ["add", "complete", "status"] },
      goal: { type: "string" }
    },
    required: ["action"]
  }
};

const server = new Server({ name: "goal-tracker-server", version: "0.1.0" }, { capabilities: { tools: {} } });
const tracker = new GoalTracker();

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: [GOAL_TRACKER_TOOL] }));
server.setRequestHandler(CallToolRequestSchema, async (req: CallToolRequest) => {
  if (req.params.name === "goalTracker") {
    return tracker.handle(((req.params.arguments ?? {}) as unknown) as GoalInput);
  }
  return { content: [{ type: "text", text: `Unknown tool: ${req.params.name}` }], isError: true };
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Goal Tracker MCP Server running on stdio");
}

runServer().catch(err => {
  console.error("Fatal error running server:", err);
  process.exit(1);
});

#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ListToolsRequestSchema, CallToolRequestSchema, CallToolRequest } from "@modelcontextprotocol/sdk/types.js";

type Result = { content: Array<{ type: "text"; text: string }>; isError?: boolean };

interface ConstraintSolverInput {
  variables: Record<string, number>;
  constraints: string[];
}

function evaluateConstraint(expr: string, vars: Record<string, number>): boolean {
  try {
    const fn = new Function(...Object.keys(vars), `return (${expr});`);
    return Boolean(fn(...Object.values(vars)));
  } catch {
    return false;
  }
}

function solve(input: ConstraintSolverInput) {
  const unsatisfied = input.constraints.filter(c => !evaluateConstraint(c, input.variables));
  return { satisfied: unsatisfied.length === 0, unsatisfied };
}

const CONSTRAINT_SOLVER_TOOL = {
  name: "constraintSolver",
  description: "Checks if a set of variables satisfies all constraints",
  inputSchema: {
    type: "object",
    properties: {
      variables: { type: "object", description: "Variable assignments" },
      constraints: { type: "array", items: { type: "string" }, description: "Boolean expressions" }
    },
    required: ["variables", "constraints"]
  }
};

class ConstraintSolverServer {
  async process(input: unknown): Promise<Result> {
    const data = input as ConstraintSolverInput;
      if (!data.variables || !data.constraints) {
        return { content: [{ type: "text", text: "Invalid input" }], isError: true };
      }
      const result = solve(data);
      return { content: [{ type: "text", text: JSON.stringify(result) }] };
  }
}

const server = new Server({ name: "constraint-solver-server", version: "0.1.0" }, { capabilities: { tools: {} } });
const constraintServer = new ConstraintSolverServer();

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: [CONSTRAINT_SOLVER_TOOL] }));
server.setRequestHandler(CallToolRequestSchema, async (req: CallToolRequest) => {
  if (req.params.name === "constraintSolver") {
    return await constraintServer.process(req.params.arguments);
  }
  return { content: [{ type: "text", text: `Unknown tool: ${req.params.name}` }], isError: true };
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Constraint Solver MCP Server running on stdio");
}

runServer().catch(err => {
  console.error("Fatal error running server:", err);
  process.exit(1);
});

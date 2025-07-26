#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import chalk from 'chalk';

// Supported frameworks
const frameworks = [
  "utilitarianism",
  "deontology",
  "virtue",
  "care",
  "social-contract",
] as const;

type FrameworkType = typeof frameworks[number];

interface EthicalRequestData {
  scenario: string;
  action: string;
  frameworks: FrameworkType[];
  confidence: number; // 0.0-1.0
  nextStepNeeded: boolean;
  suggestedNext?: FrameworkType[];
}

class EthicalReasoningServer {
  private history: EthicalRequestData[] = [];

  private validateData(input: unknown): EthicalRequestData {
    const data = input as Record<string, unknown>;

    if (!data.scenario || typeof data.scenario !== 'string') {
      throw new Error('Invalid scenario: must be a string');
    }
    if (!data.action || typeof data.action !== 'string') {
      throw new Error('Invalid action: must be a string');
    }
    if (!Array.isArray(data.frameworks) || data.frameworks.length === 0) {
      throw new Error('Invalid frameworks: must be a non-empty array');
    }
    const parsedFrameworks: FrameworkType[] = [];
    for (const f of data.frameworks) {
      if (typeof f !== 'string' || !frameworks.includes(f as FrameworkType)) {
        throw new Error(`Unsupported framework: ${String(f)}`);
      }
      parsedFrameworks.push(f as FrameworkType);
    }
    if (typeof data.confidence !== 'number' || data.confidence < 0 || data.confidence > 1) {
      throw new Error('Invalid confidence: must be between 0 and 1');
    }
    if (typeof data.nextStepNeeded !== 'boolean') {
      throw new Error('Invalid nextStepNeeded: must be boolean');
    }

    const validated: EthicalRequestData = {
      scenario: data.scenario,
      action: data.action,
      frameworks: parsedFrameworks,
      confidence: data.confidence,
      nextStepNeeded: data.nextStepNeeded,
    };

    if (Array.isArray(data.suggestedNext)) {
      validated.suggestedNext = (data.suggestedNext as unknown[]).filter((f) =>
        typeof f === 'string' && frameworks.includes(f as FrameworkType)
      ) as FrameworkType[];
    }

    return validated;
  }

  private frameworkGuidance(framework: FrameworkType, scenario: string, action: string): string {
    switch (framework) {
      case 'utilitarianism':
        return `Consider total expected benefits and harms of performing "${action}" in the scenario. Weigh overall happiness versus suffering for all stakeholders.`;
      case 'deontology':
        return `Identify the relevant duties, rights, or rules that apply to this action. Would performing "${action}" respect those duties regardless of outcomes?`;
      case 'virtue':
        return `Examine what virtues or vices the action "${action}" expresses in this situation. Would a virtuous agent act this way?`;
      case 'care':
        return `Assess how relationships and responsibilities of care are affected. Does "${action}" nurture or damage important connections?`;
      case 'social-contract':
        return `Evaluate whether the action "${action}" aligns with fair principles that rational agents would agree to under equal conditions.`;
      default:
        return 'Unknown framework';
    }
  }

  public process(input: unknown): { content: Array<{ type: string; text: string }>; isError?: boolean } {
    try {
      const data = this.validateData(input);
      this.history.push(data);

      console.error(chalk.bold('Scenario:') + ' ' + data.scenario);
      console.error(chalk.bold('Action:') + ' ' + data.action);
      console.error('');
      for (const f of data.frameworks) {
        const header = chalk.cyan(`[${f}]`);
        const guidance = this.frameworkGuidance(f, data.scenario, data.action);
        console.error(header + ' ' + guidance);
      }
      console.error('');

      const output = {
        requestNumber: this.history.length,
        nextStepNeeded: data.nextStepNeeded,
        suggestedNext: data.suggestedNext || [],
      };

      return { content: [{ type: 'text', text: JSON.stringify(output, null, 2) }] };
    } catch (error) {
      return {
        content: [{ type: 'text', text: JSON.stringify({ error: (error as Error).message }) }],
        isError: true,
      };
    }
  }
}

const ETHICAL_REASONING_TOOL: Tool = {
  name: "ethicalReasoning",
  description: `Evaluate a proposed action using multiple ethical frameworks.`,
  inputSchema: {
    type: "object",
    properties: {
      scenario: { type: "string", description: "Description of the situation" },
      action: { type: "string", description: "Action or policy to evaluate" },
      frameworks: {
        type: "array",
        description: "Ethical frameworks to apply",
        items: { type: "string", enum: frameworks as unknown as string[] },
        minItems: 1,
      },
      confidence: { type: "number", minimum: 0, maximum: 1, description: "Confidence in information" },
      nextStepNeeded: { type: "boolean", description: "Whether further analysis is required" },
      suggestedNext: {
        type: "array",
        description: "Suggested frameworks for a follow-up call",
        items: { type: "string", enum: frameworks as unknown as string[] },
      },
    },
    required: ["scenario", "action", "frameworks", "confidence", "nextStepNeeded"],
  },
};

const server = new Server({ name: "ethical-reasoning-server", version: "0.1.0" }, { capabilities: { tools: {} } });
const ethicalServer = new EthicalReasoningServer();

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: [ETHICAL_REASONING_TOOL] }));
server.setRequestHandler(CallToolRequestSchema, async (req) => {
  if (req.params.name === "ethicalReasoning") {
    return ethicalServer.process(req.params.arguments);
  }
  return { content: [{ type: "text", text: `Unknown tool: ${req.params.name}` }], isError: true };
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Ethical Reasoning MCP Server running on stdio");
}

runServer().catch((err) => {
  console.error("Fatal error running server:", err);
  process.exit(1);
});

import fs from 'node:fs/promises';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import YAML from 'yaml';

export type Plan = {
  name?: string;
  steps: Array<PlanStep>;
};

export type PlanStep = ThinkStep | ToolStep;

export type ThinkStep = {
  id: string;
  type: 'think';
  prompt: string;
};

export type ToolStep = {
  id: string;
  type: 'tool';
  tool: string;
  args?: Record<string, unknown>;
};

export type RunOptions = {
  planFilePath: string;
  outputDir: string;
};

export type TraceEvent = {
  type: 'think' | 'tool';
  stepId: string;
  name: string;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  input: unknown;
  output: unknown;
};

export async function runPlan(options: RunOptions): Promise<void> {
  const { planFilePath, outputDir } = options;
  const yamlText = await fs.readFile(planFilePath, 'utf8');
  const plan = YAML.parse(yamlText) as Plan;

  const stepOutputs: Record<string, unknown> = {};
  const traceEvents: TraceEvent[] = [];

  for (const step of plan.steps) {
    if (!step.id) throw new Error('Each step must have an id');

    const started = new Date();
    const startNs = performance.now();

    if (step.type === 'think') {
      const prompt = resolveRefs(step.prompt, stepOutputs);
      const output = runThink(prompt);
      const finished = new Date();
      const durationMs = performance.now() - startNs;
      stepOutputs[step.id] = output;
      traceEvents.push({
        type: 'think',
        stepId: step.id,
        name: 'think',
        startedAt: started.toISOString(),
        finishedAt: finished.toISOString(),
        durationMs,
        input: { prompt },
        output
      });
      continue;
    }

    if (step.type === 'tool') {
      const args = resolveRefs(step.args ?? {}, stepOutputs);
      const output = await runTool(step.tool, args as Record<string, unknown>, outputDir);
      const finished = new Date();
      const durationMs = performance.now() - startNs;
      stepOutputs[step.id] = output;
      traceEvents.push({
        type: 'tool',
        stepId: step.id,
        name: step.tool,
        startedAt: started.toISOString(),
        finishedAt: finished.toISOString(),
        durationMs,
        input: args,
        output
      });
      continue;
    }

    const _exhaustiveCheck: never = step as never;
    throw new Error('Unknown step type in plan');
  }

  // Create memo content from the last think output, if present
  const lastThinkId = [...plan.steps].reverse().find((s) => s.type === 'think')?.id;
  const lastThought = lastThinkId ? stepOutputs[lastThinkId] : undefined;
  const memoLines: string[] = [];
  memoLines.push(`# Memo: ${plan.name ?? path.basename(options.planFilePath)}`);
  memoLines.push('');
  memoLines.push('## Summary');
  if (typeof lastThought === 'string') {
    memoLines.push(lastThought);
  } else {
    memoLines.push('Plan executed successfully.');
  }
  memoLines.push('');
  memoLines.push('## Steps');
  for (const event of traceEvents) {
    memoLines.push(`- ${event.type.toUpperCase()} ${event.stepId} (${event.name}) in ${event.durationMs.toFixed(1)}ms`);
  }

  await fs.writeFile(path.resolve(outputDir, 'memo.md'), memoLines.join('\n'), 'utf8');
  await fs.writeFile(path.resolve(outputDir, 'trace.json'), JSON.stringify({ plan: plan.name, events: traceEvents }, null, 2), 'utf8');
}

function runThink(prompt: string): string {
  // Simple deterministic faux-think for demo purposes
  const trimmed = prompt.trim();
  const length = [...trimmed].length;
  return `Thought(${length} chars): ${trimmed}`;
}

async function runTool(toolName: string, args: Record<string, unknown>, outputDir: string): Promise<unknown> {
  switch (toolName) {
    case 'echo': {
      return { message: args.message ?? null };
    }
    case 'write_file': {
      const targetPath = resolveOutputPath(String(args.path ?? 'output.txt'), outputDir);
      const content = String(args.content ?? '');
      await fs.writeFile(targetPath, content, 'utf8');
      return { filePath: targetPath, bytes: Buffer.byteLength(content) };
    }
    case 'append_file': {
      const targetPath = resolveOutputPath(String(args.path ?? 'output.txt'), outputDir);
      const content = String(args.content ?? '');
      await fs.appendFile(targetPath, content, 'utf8');
      return { filePath: targetPath, bytesAppended: Buffer.byteLength(content) };
    }
    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

function resolveOutputPath(maybeRelative: string, outputDir: string): string {
  if (path.isAbsolute(maybeRelative)) return maybeRelative;
  return path.resolve(outputDir, maybeRelative);
}

function resolveRefs<T = unknown>(value: T, context: Record<string, unknown>): T {
  if (typeof value === 'string') {
    return interpolateString(value, context) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((v) => resolveRefs(v, context)) as unknown as T;
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = resolveRefs(v, context);
    }
    return out as unknown as T;
  }
  return value;
}

function interpolateString(template: string, context: Record<string, unknown>): string {
  return template.replace(/\$\{ref:([^}]+)\}/g, (_m, refPath) => {
    const resolved = getRefValue(String(refPath), context);
    return resolved == null ? '' : String(resolved);
  });
}

function getRefValue(refPath: string, context: Record<string, unknown>): unknown {
  // Format: stepId[.output][.path.to.key]
  const parts = refPath.split('.');
  const stepId = parts.shift()!;
  let current: unknown = context[stepId];
  if (current == null) return undefined;

  // Allow redundant 'output' segment
  if (parts[0] === 'output') parts.shift();

  for (const segment of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[segment];
  }
  return current;
}
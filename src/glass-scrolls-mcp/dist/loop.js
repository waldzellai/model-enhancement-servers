import fs from 'node:fs/promises';
import path from 'node:path';
import { performance } from 'node:perf_hooks';
import YAML from 'yaml';
export async function runPlan(options) {
    const { planFilePath, outputDir } = options;
    const yamlText = await fs.readFile(planFilePath, 'utf8');
    const plan = YAML.parse(yamlText);
    const stepOutputs = {};
    const traceEvents = [];
    for (const step of plan.steps) {
        if (!step.id)
            throw new Error('Each step must have an id');
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
            const output = await runTool(step.tool, args, outputDir);
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
        const _exhaustiveCheck = step;
        throw new Error('Unknown step type in plan');
    }
    // Create memo content from the last think output, if present
    const lastThinkId = [...plan.steps].reverse().find((s) => s.type === 'think')?.id;
    const lastThought = lastThinkId ? stepOutputs[lastThinkId] : undefined;
    const memoLines = [];
    memoLines.push(`# Memo: ${plan.name ?? path.basename(options.planFilePath)}`);
    memoLines.push('');
    memoLines.push('## Summary');
    if (typeof lastThought === 'string') {
        memoLines.push(lastThought);
    }
    else {
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
function runThink(prompt) {
    // Simple deterministic faux-think for demo purposes
    const trimmed = prompt.trim();
    const length = [...trimmed].length;
    return `Thought(${length} chars): ${trimmed}`;
}
async function runTool(toolName, args, outputDir) {
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
function resolveOutputPath(maybeRelative, outputDir) {
    if (path.isAbsolute(maybeRelative))
        return maybeRelative;
    return path.resolve(outputDir, maybeRelative);
}
function resolveRefs(value, context) {
    if (typeof value === 'string') {
        return interpolateString(value, context);
    }
    if (Array.isArray(value)) {
        return value.map((v) => resolveRefs(v, context));
    }
    if (value && typeof value === 'object') {
        const out = {};
        for (const [k, v] of Object.entries(value)) {
            out[k] = resolveRefs(v, context);
        }
        return out;
    }
    return value;
}
function interpolateString(template, context) {
    return template.replace(/\$\{ref:([^}]+)\}/g, (_m, refPath) => {
        const resolved = getRefValue(String(refPath), context);
        return resolved == null ? '' : String(resolved);
    });
}
function getRefValue(refPath, context) {
    // Format: stepId[.output][.path.to.key]
    const parts = refPath.split('.');
    const stepId = parts.shift();
    let current = context[stepId];
    if (current == null)
        return undefined;
    // Allow redundant 'output' segment
    if (parts[0] === 'output')
        parts.shift();
    for (const segment of parts) {
        if (current == null || typeof current !== 'object')
            return undefined;
        current = current[segment];
    }
    return current;
}
//# sourceMappingURL=loop.js.map
function now() {
    return Date.now();
}
async function callTool(toolName, input) {
    // Stubbed tools for demo. No external processes.
    if (toolName === 'python') {
        // Simulate a computation that would otherwise call Python.
        // For determinism, produce a predictable transformation.
        return { echoed: input, note: 'computed-by-stub-python' };
    }
    if (toolName === 'search') {
        return { hits: [`Result for ${String(input)}`] };
    }
    if (toolName === 'summarize') {
        const text = typeof input === 'string' ? input : JSON.stringify(input);
        return `Summary: ${text.slice(0, 40)}`;
    }
    return { ok: true, input };
}
export async function run(plan, trace) {
    const results = [];
    for (const step of plan) {
        const start = now();
        trace.record({
            ts: start,
            type: 'toolCall',
            stepId: step.id,
            toolName: step.toolName,
            input: step.input,
            output: null,
            durationMs: 0,
        });
        const output = await callTool(step.toolName, step.input);
        const end = now();
        trace.record({
            ts: end,
            type: 'toolResult',
            stepId: step.id,
            toolName: step.toolName,
            input: step.input,
            output,
            durationMs: Math.max(0, end - start),
        });
        results.push({ stepId: step.id, output });
    }
    const memo = results
        .map((r, idx) => `S${idx + 1}[${r.stepId}]: ${JSON.stringify(r.output)}`)
        .join('\n');
    return { memo, results };
}
export async function replay(plan, trace) {
    const events = trace.toJSON();
    const results = [];
    for (const step of plan) {
        // Find the next matching toolResult for this step
        const recorded = events.find((ev) => ev.type === 'toolResult' && ev.stepId === step.id && ev.toolName === step.toolName);
        if (!recorded) {
            throw new Error(`No recorded output for step ${step.id} (${step.toolName})`);
        }
        // During replay, we DO NOT call the actual tool. We inject recorded output.
        results.push({ stepId: step.id, output: recorded.output });
    }
    const memo = results
        .map((r, idx) => `S${idx + 1}[${r.stepId}]: ${JSON.stringify(r.output)}`)
        .join('\n');
    return { memo, results };
}
//# sourceMappingURL=loop.js.map
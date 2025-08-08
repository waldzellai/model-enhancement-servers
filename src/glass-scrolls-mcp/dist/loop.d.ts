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
export declare function runPlan(options: RunOptions): Promise<void>;

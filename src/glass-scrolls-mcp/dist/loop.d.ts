import { Trace } from './observability/trace.js';
export type PlanStep = {
    id: string;
    toolName: string;
    input: unknown;
};
export type Plan = PlanStep[];
export type ExecuteResult = {
    memo: string;
    results: Array<{
        stepId: string;
        output: unknown;
    }>;
};
export declare function run(plan: Plan, trace: Trace): Promise<ExecuteResult>;
export declare function replay(plan: Plan, trace: Trace): Promise<ExecuteResult>;

export type TraceEvent = {
    ts: number;
    type: string;
    stepId: string;
    toolName: string;
    input: unknown;
    output: unknown;
    durationMs: number;
};
export declare class Trace {
    private readonly events;
    record(event: TraceEvent): void;
    toJSON(): TraceEvent[];
    static fromJSON(json: unknown): Trace;
    persist(filePath: string): Promise<void>;
}

import fs from 'node:fs/promises';
import path from 'node:path';
export class Trace {
    events = [];
    record(event) {
        this.events.push(event);
    }
    toJSON() {
        return [...this.events];
    }
    static fromJSON(json) {
        const trace = new Trace();
        const eventsArray = Array.isArray(json)
            ? json
            : json?.events ?? [];
        for (const ev of eventsArray) {
            // Minimal validation and normalization
            const normalized = {
                ts: typeof ev.ts === 'number' ? ev.ts : Date.now(),
                type: String(ev.type ?? 'event'),
                stepId: String(ev.stepId ?? ''),
                toolName: String(ev.toolName ?? ''),
                input: ev.input,
                output: ev.output,
                durationMs: typeof ev.durationMs === 'number' ? ev.durationMs : 0,
            };
            trace.record(normalized);
        }
        return trace;
    }
    async persist(filePath) {
        const dir = path.dirname(filePath);
        await fs.mkdir(dir, { recursive: true });
        const json = JSON.stringify(this.toJSON(), null, 2);
        await fs.writeFile(filePath, json, 'utf8');
    }
}
//# sourceMappingURL=trace.js.map
#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import path from 'node:path';
import fs from 'node:fs/promises';
import { Trace } from './observability/trace.js';
import { run, replay } from './loop.js';
const TRACE_PATH = path.resolve(process.cwd(), 'demos/bass/out/trace.json');
function demoPlan() {
    return [
        { id: 'step-1', toolName: 'python', input: { a: 1, b: 2 } },
        { id: 'step-2', toolName: 'search', input: 'glass scrolls' },
        { id: 'step-3', toolName: 'summarize', input: 'This is a short text to summarize.' },
    ];
}
async function writeMemo(filePath, memo) {
    const outPath = path.resolve(path.dirname(filePath), 'memo.txt');
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, memo, 'utf8');
}
await yargs(hideBin(process.argv))
    .scriptName('mcp-server-glass-scrolls')
    .command('demo', 'Run demo plan, capture trace, and write outputs', () => { }, async () => {
    const plan = demoPlan();
    const trace = new Trace();
    const result = await run(plan, trace);
    await trace.persist(TRACE_PATH);
    await writeMemo(TRACE_PATH, result.memo);
    console.log('Demo memo:\n' + result.memo);
    console.log(`Trace written to: ${TRACE_PATH}`);
})
    .command('replay', 'Replay the plan from recorded trace without calling tools', () => { }, async () => {
    const plan = demoPlan();
    const json = JSON.parse(await fs.readFile(TRACE_PATH, 'utf8'));
    const trace = Trace.fromJSON(json);
    const result = await replay(plan, trace);
    await writeMemo(TRACE_PATH, result.memo);
    console.log('Replayed memo:\n' + result.memo);
})
    .demandCommand(1)
    .help()
    .strict()
    .parse();
//# sourceMappingURL=index.js.map
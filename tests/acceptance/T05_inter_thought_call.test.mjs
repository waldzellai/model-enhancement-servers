import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const workspaceRoot = path.resolve(process.cwd());
const tracePath = path.join(workspaceRoot, 'trace.json');
const memoPath = path.join(workspaceRoot, 'memo.md');

// Clean previous outputs
for (const p of [tracePath, memoPath]) {
  try { fs.unlinkSync(p); } catch {}
}

// Build only the target package
execSync('pnpm --filter @waldzellai/glass-scrolls-mcp run build', {
  stdio: 'inherit',
  cwd: workspaceRoot
});

// Run the demo which uses the plan loop and writes outputs in CWD
execSync('pnpm demo:bass', { stdio: 'inherit', cwd: workspaceRoot });

// Verify outputs exist
assert.ok(fs.existsSync(tracePath), 'trace.json should exist');
assert.ok(fs.existsSync(memoPath), 'memo.md should exist');

// Verify at least one tool event in the trace
const trace = JSON.parse(fs.readFileSync(tracePath, 'utf8'));
assert.ok(Array.isArray(trace.events), 'trace.events should be an array');
const toolEvents = trace.events.filter((e) => e.type === 'tool');
assert.ok(toolEvents.length >= 1, 'There should be at least one tool call event in the trace');

console.log('T05_inter_thought_call: PASS');
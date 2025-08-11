import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Spawn a separate Node process from repo root to ensure module resolves worker path robustly

test('T07: Python worker runs regardless of process cwd', async () => {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const packageRoot = path.resolve(here, '../..');
  const repoRoot = path.resolve(packageRoot, '..');
  const testFile = path.resolve(packageRoot, 'tests/helpers/run_call_python_worker.ts');
  const tsxBin = path.resolve(packageRoot, 'node_modules/.bin/tsx');

  const child = spawn(tsxBin, [testFile], { cwd: repoRoot, stdio: ['ignore', 'pipe', 'inherit'] });

  let out = '';
  child.stdout.setEncoding('utf-8');
  child.stdout.on('data', (d) => (out += d));

  await new Promise<void>((resolve, reject) => {
    child.on('error', reject);
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error('child failed'))));
  });

  const parsed = JSON.parse(out.trim());
  assert.ok(parsed.series.t.length > 10);
});
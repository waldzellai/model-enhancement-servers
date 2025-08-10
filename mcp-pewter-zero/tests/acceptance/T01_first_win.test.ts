import test from 'node:test';
import assert from 'node:assert/strict';
import { callPythonWorker } from '../../src/adapters/pythonWorker.ts';

// Smoke test: can we run the baseline model?

test('T01: 5-minute first win — baseline run produces series', async () => {
  const input = {
    spec: { kind: 'python', entry: 'python.models.bass_diffusion:model', variables: ['A'], dt: 0.5, t_end: 50 },
    params: { p: 0.03, q: 0.38, M: 10000 }
  };
  const out = await callPythonWorker({ fn: 'run_model', payload: input });
  assert.ok(out.series.t.length > 10);
  assert.ok(out.series.y.A[0] === 0);
});
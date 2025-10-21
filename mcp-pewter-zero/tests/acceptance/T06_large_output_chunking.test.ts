import test from 'node:test';
import assert from 'node:assert/strict';
import { callPythonWorker } from '../../src/adapters/pythonWorker.ts';

// This test uses a small dt and large t_end to create a long stdout payload
// to verify that the Node adapter aggregates chunks correctly.

test('T06: Python worker large output is correctly parsed across chunks', async () => {
  const input = {
    spec: { kind: 'python', entry: 'python.models.bass_diffusion:model', variables: ['A'], dt: 0.05, t_end: 200 },
    params: { p: 0.03, q: 0.38, M: 10000 }
  };
  const out = await callPythonWorker({ fn: 'run_model', payload: input });
  assert.ok(out.series.t.length > 2000);
  assert.equal(out.series.y.A.length, out.series.t.length);
});
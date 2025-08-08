import { setupTracing } from './observability/trace.js';

export async function runDemoPlan(plan: any) {
  const trace = setupTracing();
  // Placeholder: integrate with @seqthink/runtime when available
  await trace.persist('./demos/bass/out/trace.json');
  return { ok: true };
}
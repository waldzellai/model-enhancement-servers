import { registerAllTools } from './tools/index.js';
import { setupTracing } from './observability/trace.js';

async function main() {
  const trace = setupTracing();
  registerAllTools({ trace });
  console.log('[mcp-pewter-zero] ready');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
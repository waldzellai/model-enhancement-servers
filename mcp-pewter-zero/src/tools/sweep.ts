import { SweepInput, SweepOutput } from '../types';
import { callPythonWorker } from '../adapters/pythonWorker';
import inputSchema from '../schemas/sweep.input.schema.json' assert { type: 'json' };
import outputSchema from '../schemas/sweep.output.schema.json' assert { type: 'json' };

export function registerSweep(ctx: { registerTool: (t: any) => void }) {
  ctx.registerTool({
    name: 'sweep',
    inputSchema: inputSchema,
    outputSchema: outputSchema,
    async handler(input: SweepInput) {
      return await callPythonWorker({ fn: 'sweep', payload: input }) as SweepOutput;
    }
  });
}
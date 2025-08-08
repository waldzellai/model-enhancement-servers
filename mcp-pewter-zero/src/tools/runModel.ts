import { RunModelInput, RunModelOutput } from '../types';
import { callPythonWorker } from '../adapters/pythonWorker';
import inputSchema from '../schemas/run_model.input.schema.json' assert { type: 'json' };
import outputSchema from '../schemas/run_model.output.schema.json' assert { type: 'json' };

export function registerRunModel(ctx: { registerTool: (t: any) => void }) {
  ctx.registerTool({
    name: 'run_model',
    inputSchema,
    outputSchema,
    async handler(input: RunModelInput) {
      return await callPythonWorker({ fn: 'run_model', payload: input }) as RunModelOutput;
    }
  });
}
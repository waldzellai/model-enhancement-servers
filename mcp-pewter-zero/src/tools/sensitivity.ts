import { SensitivityInput, SensitivityOutput } from '../types';
import { callPythonWorker } from '../adapters/pythonWorker';
import inputSchema from '../schemas/sensitivity.input.schema.json' assert { type: 'json' };
import outputSchema from '../schemas/sensitivity.output.schema.json' assert { type: 'json' };

export function registerSensitivity(ctx: { registerTool: (t: any) => void }) {
  ctx.registerTool({
    name: 'sensitivity',
    inputSchema,
    outputSchema,
    async handler(input: SensitivityInput) {
      return await callPythonWorker({ fn: 'sensitivity', payload: input }) as SensitivityOutput;
    }
  });
}
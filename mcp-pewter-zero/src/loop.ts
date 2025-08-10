import fs from 'node:fs/promises';
import yaml from 'js-yaml';
import { registerRunModel } from './tools/runModel.js';
import { registerSweep } from './tools/sweep.js';
import { registerSensitivity } from './tools/sensitivity.js';
import { registerReport } from './tools/report.js';
import { setupTracing } from './observability/trace.js';

const tools: any = {};
const ctx = {
  registerTool: (t: any) => {
    tools[t.name] = t.handler;
  }
};

registerRunModel(ctx);
registerSweep(ctx);
registerSensitivity(ctx);
registerReport(ctx);

async function main() {
  const planYaml = await fs.readFile('plans/bass.plan.yaml', 'utf8');
  const plan = yaml.load(planYaml) as any;

  const trace = setupTracing();
  const context: any = {};

  for (const step of plan.steps) {
    if (step.kind === 'tool') {
      const tool = tools[step.toolName as keyof typeof tools];
      if (tool) {
        // A simple way to handle $ref
        const resolvedInput = JSON.parse(JSON.stringify(step.input));
        for (const key in resolvedInput) {
            const value = resolvedInput[key];
            if (typeof value === 'string' && value.startsWith('$ref:')) {
                const ref = value.substring(5);
                const [stepId, path] = ref.split('.');
                if (context[stepId] && context[stepId][path]) {
                    resolvedInput[key] = context[stepId][path];
                }
            }
        }
        const result = await tool(resolvedInput);
        context[step.id] = result;
      }
    }
  }

  await fs.mkdir('demos/bass/out', { recursive: true });
  await fs.writeFile('demos/bass/out/run.json', JSON.stringify(context, null, 2));
  await trace.persist('./demos/bass/out/trace.json');

  console.log('Demo complete: demos/bass/out/run.json');
}

main().catch(console.error);
import { ReportInput, ReportOutput } from '../types';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { Eta } from 'eta';
import reportInputSchema from '../schemas/report.input.schema.json' assert { type: 'json' };
import reportOutputSchema from '../schemas/report.output.schema.json' assert { type: 'json' };

const eta = new Eta();

export function registerReport(ctx: { registerTool: (t: any) => void }) {
  ctx.registerTool({
    name: 'report',
    inputSchema: reportInputSchema,
    outputSchema: reportOutputSchema,
    async handler(input: ReportInput) {
      const { title, runs, memoTemplatePath, outDir } = input;
      await fs.mkdir(outDir, { recursive: true });
      const tpl = await fs.readFile(memoTemplatePath, 'utf-8');
      const memo = eta.renderString(tpl, { title, runs });
      const memoPath = path.join(outDir, 'memo.md');
      await fs.writeFile(memoPath, memo ?? '');
      return { memoPath, assets: [] } as ReportOutput;
    }
  });
}
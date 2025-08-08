import { registerRunModel } from './runModel';
import { registerSweep } from './sweep';
import { registerSensitivity } from './sensitivity';
import { registerReport } from './report';

export function registerAllTools(ctx: { trace: any; registerTool?: any }) {
  const registerTool = ctx.registerTool ?? ((t: any) => t);
  [registerRunModel, registerSweep, registerSensitivity, registerReport]
    .forEach((fn) => fn({ registerTool, trace: ctx.trace }));
}
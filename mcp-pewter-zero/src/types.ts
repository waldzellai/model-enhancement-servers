export type Float = number;
export type Series = { t: number[]; y: Record<string, Float[]> };

export interface ModelSpec {
  kind: 'python' | 'xmile';
  entry: string;
  variables: string[];
  dt: Float;
  t_end: Float;
}

export type ParamValue = number;
export type ParamSpec = Record<string, ParamValue>;

export interface RunModelInput {
  spec: ModelSpec;
  params: ParamSpec;
  seed?: number;
}
export interface RunModelOutput { series: Series; metrics?: Record<string, number>; }

export interface SweepInput {
  spec: ModelSpec;
  grid: Record<string, number[]>;
  budget?: number;
  seed?: number;
}
export interface SweepOutput {
  runs: Array<{ params: ParamSpec; series: Series; score?: number }>;
}

export interface SensitivityInput {
  spec: ModelSpec;
  baseline: ParamSpec;
  method: 'one_at_a_time' | 'sobol';
  ranges?: Record<string, [number, number]>;
  seed?: number;
}
export interface SensitivityOutput {
  ranking: Array<{ param: string; importance: number }>;
}

export interface ReportInput {
  title: string;
  runs: Array<{ label: string; params: ParamSpec; series: Series }>;
  memoTemplatePath: string;
  outDir: string;
}
export interface ReportOutput { memoPath: string; assets: string[]; }
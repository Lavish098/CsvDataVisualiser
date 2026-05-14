export type ColumnType = "Date" | "Currency" | "Number" | "Percentage" | "String" | "Empty";

export type ColumnProfile = {
  name: string;
  type: ColumnType;
  filled: number;
  missing: number;
  unique: number;
  samples: string[];
  min?: number;
  max?: number;
  average?: number;
};

export type ChartKind = "Bar" | "Line" | "Area" | "Pie" | "Scatter" | "Radial";

export type ChartRecommendation = {
  id: string;
  title: string;
  subtitle: string;
  kind: ChartKind;
  chartType: ChartKind;
  xKey: string;
  yKey: string;
  secondaryKey?: string;
  confidence: number;
};

export type AiChartRecommendation = {
  chartType: ChartKind;
  xAxis: string;
  yAxis: string;
};

export type AiDashboardResponse = {
  summary: string;
  recommendedCharts: AiChartRecommendation[];
  keyInsights: string[];
};

export type DatasetSummary = {
  fileName: string;
  rows: number;
  columns: number;
  profiles: ColumnProfile[];
  recommendations: ChartRecommendation[];
  metrics: MetricCard[];
  insights: Insight[];
  ai?: AiDashboardResponse;
};

export type MetricCard = {
  label: string;
  value: string;
  detail: string;
  trend: "up" | "down" | "flat";
};

export type Insight = {
  title: string;
  body: string;
  tone: "positive" | "warning" | "neutral";
};

export type ParsedDataset = {
  fileName: string;
  rows: Record<string, string | number | boolean | null>[];
  summary: DatasetSummary;
  sample: Record<string, string | number | boolean | null>[];
};

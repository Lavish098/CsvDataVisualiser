import Papa from "papaparse";
import * as XLSX from "xlsx";
import type {
  AiDashboardResponse,
  ChartKind,
  ChartRecommendation,
  ColumnProfile,
  ColumnType,
  DatasetSummary,
  Insight,
  MetricCard,
  ParsedDataset,
} from "@/types/analytics";

const currencyPattern = /^-?\(?[$£€]?\s?[\d,]+(\.\d+)?\)?$/;
const numberPattern = /^-?\(?[\d,]+(\.\d+)?\)?$/;
const percentagePattern = /^-?\(?[\d,]+(\.\d+)?\)?%$/;

export async function parseDataFile(file: File): Promise<Record<string, unknown>[]> {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension === "xlsx" || extension === "xls") {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array", cellDates: true });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json<Record<string, unknown>>(firstSheet, { defval: "" });
  }

  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, unknown>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => resolve(result.data),
      error: reject,
    });
  });
}

export function inferSchema(rows: Record<string, unknown>[]): ColumnProfile[] {
  const sample = rows.slice(0, 50);
  const columns = Object.keys(sample[0] ?? rows[0] ?? {});

  return columns.map((name) => {
    const values = sample.map((row) => row[name]);
    const allValues = rows.map((row) => row[name]);
    const type = detectColumnType(values);
    const present = allValues.filter(hasValue);
    const cleaned = present.map((value) => cleanValue(value, type));
    const numeric = cleaned.filter((value): value is number => typeof value === "number");

    return {
      name,
      type,
      filled: present.length,
      missing: allValues.length - present.length,
      unique: new Set(present.map((value) => String(value).trim())).size,
      samples: present.slice(0, 4).map((value) => String(value)),
      min: numeric.length ? Math.min(...numeric) : undefined,
      max: numeric.length ? Math.max(...numeric) : undefined,
      average: numeric.length ? numeric.reduce((sum, value) => sum + value, 0) / numeric.length : undefined,
    };
  });
}

export function detectColumnType(values: unknown[]): ColumnType {
  const present = values.filter(hasValue);
  if (!present.length) return "Empty";

  const scores = {
    Currency: ratio(present, (value) => currencyPattern.test(String(value).trim()) && /[$£€,]/.test(String(value))),
    Percentage: ratio(present, (value) => percentagePattern.test(String(value).trim())),
    Number: ratio(present, (value) => numberPattern.test(String(value).trim())),
    Date: ratio(present, (value) => looksLikeDate(value)),
  };

  if (scores.Currency >= 0.72) return "Currency";
  if (scores.Percentage >= 0.72) return "Percentage";
  if (scores.Number >= 0.82) return "Number";
  if (scores.Date >= 0.72) return "Date";
  return "String";
}

export function cleanValue(value: unknown, type: ColumnType) {
  if (!hasValue(value)) return null;
  const raw = String(value).trim();

  if (type === "Currency" || type === "Number" || type === "Percentage") {
    const normalized = Number(raw.replace(/[,$£€%\s]/g, "").replace(/^\((.*)\)$/, "-$1"));
    if (!Number.isFinite(normalized)) return null;
    return type === "Percentage" ? normalized / 100 : normalized;
  }

  if (type === "Date") {
    const date = new Date(raw);
    return Number.isNaN(date.getTime()) ? raw : date.toISOString().slice(0, 10);
  }

  return raw;
}

export function makeDataset(fileName: string, rawRows: Record<string, unknown>[], ai?: AiDashboardResponse): ParsedDataset {
  const nonEmptyRows = rawRows.filter((row) => Object.values(row).some(hasValue));
  const profiles = inferSchema(nonEmptyRows);
  const rows = nonEmptyRows.map((row) =>
    Object.fromEntries(profiles.map((profile) => [profile.name, cleanValue(row[profile.name], profile.type)])),
  ) as ParsedDataset["rows"];
  const localRecommendations = recommendCharts(profiles);
  const aiRecommendations = ai?.recommendedCharts?.length ? ai.recommendedCharts.map((chart, index) => toChartRecommendation(chart, index, profiles)) : [];
  const recommendations = mergeRecommendations(aiRecommendations, localRecommendations);
  const summary: DatasetSummary = {
    fileName,
    rows: rows.length,
    columns: profiles.length,
    profiles,
    recommendations,
    metrics: buildMetrics(rows.length, profiles),
    insights: ai ? ai.keyInsights.map((body, index) => ({ title: `Insight ${index + 1}`, body, tone: "neutral" })) : buildInsights(rows.length, profiles, recommendations),
    ai,
  };

  return { fileName, rows, summary, sample: rows.slice(0, 5) };
}

export function aggregateForChart(rows: ParsedDataset["rows"], recommendation: ChartRecommendation) {
  if (recommendation.kind === "Scatter") {
    return rows
      .map((row) => ({
        name: String(row[recommendation.xKey] ?? ""),
        x: typeof row[recommendation.xKey] === "number" ? row[recommendation.xKey] : null,
        y: typeof row[recommendation.yKey] === "number" ? row[recommendation.yKey] : null,
      }))
      .filter((row): row is { name: string; x: number; y: number } => typeof row.x === "number" && typeof row.y === "number")
      .slice(0, 500);
  }

  const groups = new Map<string, { name: string; value: number; count: number }>();

  rows.forEach((row) => {
    const key = String(row[recommendation.xKey] ?? "Unassigned");
    const current = groups.get(key) ?? { name: key, value: 0, count: 0 };
    const rawValue = row[recommendation.yKey];
    groups.set(key, { name: key, value: current.value + (typeof rawValue === "number" ? rawValue : 1), count: current.count + 1 });
  });

  const grouped = Array.from(groups.values());
  const shouldUseCounts = (recommendation.kind === "Pie" || recommendation.kind === "Radial") && grouped.every((item) => item.value <= 0);

  return grouped
    .map((item) => ({ name: item.name, value: shouldUseCounts ? item.count : item.value }))
    .filter((item) => (recommendation.kind === "Pie" || recommendation.kind === "Radial" ? item.value > 0 : true))
    .sort((a, b) => (recommendation.kind === "Line" || recommendation.kind === "Area" ? a.name.localeCompare(b.name) : b.value - a.value))
    .slice(0, recommendation.kind === "Line" || recommendation.kind === "Area" ? 80 : 12);
}

export function toAiPayload(dataset: ParsedDataset) {
  return {
    schema: dataset.summary.profiles.map((profile) => ({ name: profile.name, type: profile.type })),
    sample: dataset.sample,
  };
}

function toChartRecommendation(chart: { chartType: ChartKind; xAxis: string; yAxis: string }, index: number, profiles: ColumnProfile[]): ChartRecommendation {
  const normalizedKind = normalizeChartKind(chart.chartType);
  const numeric = profiles.filter((profile) => isMeasure(profile));
  const xKey = profiles.some((profile) => profile.name === chart.xAxis) ? chart.xAxis : profiles.find((profile) => profile.type === "Date" || profile.type === "String")?.name ?? profiles[0]?.name ?? "Records";
  const yKey = profiles.some((profile) => profile.name === chart.yAxis) ? chart.yAxis : numeric[0]?.name ?? profiles[1]?.name ?? xKey;

  return {
    id: `${normalizedKind.toLowerCase()}-${index}`,
    title: `${yKey} by ${xKey}`,
    subtitle: "Recommended by Chartify AI.",
    kind: normalizedKind,
    chartType: normalizedKind,
    xKey,
    yKey,
    confidence: 90 - index * 4,
  };
}

function recommendCharts(profiles: ColumnProfile[]): ChartRecommendation[] {
  const numeric = profiles.filter((profile) => isMeasure(profile));
  const dates = profiles.filter((profile) => profile.type === "Date");
  const strings = profiles.filter((profile) => profile.type === "String");
  const x = dates[0]?.name ?? strings[0]?.name ?? profiles[0]?.name ?? "Records";
  const y = numeric[0]?.name ?? profiles[0]?.name ?? "Records";
  const y2 = numeric.find((profile) => profile.name !== y)?.name ?? y;

  return [
    ["Bar", strings[0]?.name ?? x, y, "Compare groups quickly."],
    ["Line", dates[0]?.name ?? x, y, "Track movement over time."],
    ["Area", dates[0]?.name ?? x, y, "Show cumulative momentum."],
    ["Pie", strings[0]?.name ?? x, y, "Read contribution by segment."],
    ["Scatter", y, y2, "Spot correlation and outliers."],
    ["Radial", strings[0]?.name ?? x, y, "Scan ranked contribution in a compact radial view."],
  ].map(([kind, xKey, yKey, subtitle], index) => ({
    id: `${String(kind).toLowerCase()}-${index}`,
    title: `${yKey} by ${xKey}`,
    subtitle: String(subtitle),
    kind: kind as ChartKind,
    chartType: kind as ChartKind,
    xKey: String(xKey),
    yKey: String(yKey),
    confidence: 92 - index * 5,
  }));
}

function mergeRecommendations(primary: ChartRecommendation[], fallback: ChartRecommendation[]) {
  const byKind = new Map<ChartKind, ChartRecommendation>();
  [...primary, ...fallback].forEach((chart) => {
    if (!byKind.has(chart.kind)) byKind.set(chart.kind, chart);
  });
  return Array.from(byKind.values()).slice(0, 6);
}

function normalizeChartKind(kind: string): ChartKind {
  const normalized = String(kind).toLowerCase();
  if (normalized === "line") return "Line";
  if (normalized === "area") return "Area";
  if (normalized === "pie") return "Pie";
  if (normalized === "scatter") return "Scatter";
  if (normalized === "radial") return "Radial";
  return "Bar";
}

function isMeasure(profile: ColumnProfile) {
  return ["Number", "Currency", "Percentage"].includes(profile.type);
}

function buildMetrics(rowCount: number, profiles: ColumnProfile[]): MetricCard[] {
  const numeric = profiles.filter((profile) => ["Number", "Currency", "Percentage"].includes(profile.type));
  const completeness = profiles.length ? Math.round((profiles.reduce((sum, profile) => sum + profile.filled, 0) / (rowCount * profiles.length || 1)) * 100) : 0;

  return [
    { label: "Rows parsed", value: Intl.NumberFormat().format(rowCount), detail: `${profiles.length} columns detected`, trend: "flat" },
    { label: "Completeness", value: `${completeness}%`, detail: completeness > 90 ? "Healthy dataset" : "Review missing values", trend: completeness > 90 ? "up" : "down" },
    { label: "Measures", value: String(numeric.length), detail: numeric[0] ? `Primary: ${numeric[0].name}` : "No numeric column found", trend: numeric.length ? "up" : "flat" },
  ];
}

function buildInsights(rowCount: number, profiles: ColumnProfile[], recommendations: ChartRecommendation[]): Insight[] {
  const measures = profiles.filter((profile) => ["Number", "Currency", "Percentage"].includes(profile.type));
  return [
    {
      title: "Plain English read",
      body: `This dataset contains ${Intl.NumberFormat().format(rowCount)} rows across ${profiles.length} columns, with ${measures.length} measurable fields ready for charts.`,
      tone: "neutral",
    },
    {
      title: "Best first view",
      body: recommendations[0] ? `${recommendations[0].title} is the strongest starting chart based on the detected schema.` : "Upload data with at least one category and one measure to unlock better charts.",
      tone: "positive",
    },
    {
      title: "Data quality",
      body: profiles.some((profile) => profile.missing > rowCount * 0.2)
        ? "One or more columns have notable missing values, so totals may undercount the full picture."
        : "The sampled columns look complete enough for a first-pass dashboard.",
      tone: "warning",
    },
  ];
}

function ratio(values: unknown[], predicate: (value: unknown) => boolean) {
  return values.filter(predicate).length / values.length;
}

function hasValue(value: unknown) {
  return value !== null && value !== undefined && String(value).trim() !== "";
}

function looksLikeDate(value: unknown) {
  if (value instanceof Date) return true;
  const raw = String(value).trim();
  if (!/[/-]/.test(raw) && !/^\d{4}\d{2}\d{2}$/.test(raw)) return false;
  const date = new Date(raw);
  return !Number.isNaN(date.getTime());
}

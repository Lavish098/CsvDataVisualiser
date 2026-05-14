"use client";

import Link from "next/link";
import { useMemo, useRef, useState, type DragEvent, type ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Scatter,
  ScatterChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart3, Download, FileSpreadsheet, GalleryVerticalEnd, Loader2, Lock, LogIn, Share2, Sparkles, UploadCloud, Wand2 } from "lucide-react";
import clsx from "clsx";
import { aggregateForChart, parseDataFile, toAiPayload } from "@/lib/analytics";
import { useDataStore } from "@/components/DataProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { AiDashboardResponse, ChartRecommendation, ParsedDataset } from "@/types/analytics";

const palette = ["#111111", "#525252", "#737373", "#a3a3a3", "#d4d4d4", "#404040"];

export function AnalyticsWorkspace({ mode = "dashboard" }: { mode?: "upload" | "dashboard" | "gallery" | "auth" }) {
  const { dataset, setDatasetFromRows, setAiInsights, loadSample, planType, setPlanType } = useDataStore();
  const [isParsing, setIsParsing] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [notice, setNotice] = useState("Drop in a CSV or Excel file. Chartify keeps parsing client-side.");
  const [isSignedIn, setIsSignedIn] = useState(false);

  async function handleFile(file?: File) {
    if (!file) return;
    setIsParsing(true);
    setNotice("Parsing spreadsheet and cleaning values...");

    try {
      const rows = await parseDataFile(file);
      const next = setDatasetFromRows(file.name, rows);
      setNotice("Schema detected. Asking AI for a concise dashboard plan...");
      await requestAiInsights(next);
    } catch {
      setNotice("Could not parse that file. Try a clean CSV, XLS, or XLSX export.");
    } finally {
      setIsParsing(false);
    }
  }

  async function requestAiInsights(nextDataset = dataset) {
    setIsAiLoading(true);
    try {
      const response = await fetch("/api/ai/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toAiPayload(nextDataset)),
      });
      const ai = (await response.json()) as AiDashboardResponse;
      setAiInsights(ai);
      setNotice("AI summary and recommended charts are ready.");
    } catch {
      setNotice("AI insights are unavailable right now, so Chartify used local chart recommendations.");
    } finally {
      setIsAiLoading(false);
    }
  }

  if (mode === "auth") return <AuthScreen onDemo={() => setIsSignedIn(true)} />;
  if (mode === "gallery") return <ProjectGallery />;

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <AppHeader isSignedIn={isSignedIn} planType={planType} onPlanToggle={() => setPlanType(planType === "free" ? "pro" : "free")} />
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {mode === "upload" ? (
          <UploadView dataset={dataset} isParsing={isParsing} isAiLoading={isAiLoading} notice={notice} onFile={handleFile} onSample={loadSample} />
        ) : (
          <DashboardView
            dataset={dataset}
            isParsing={isParsing}
            isAiLoading={isAiLoading}
            notice={notice}
            planType={planType}
            onFile={handleFile}
            onSample={loadSample}
            onAi={() => requestAiInsights()}
          />
        )}
      </section>
    </main>
  );
}

function AppHeader({ isSignedIn, planType, onPlanToggle }: { isSignedIn: boolean; planType: "free" | "pro"; onPlanToggle: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-canvas">
            <BarChart3 size={18} />
          </span>
          <span>
            <span className="block text-sm font-semibold leading-4">Chartify</span>
            <span className="block text-xs text-muted">AI data dashboards</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 rounded-lg border border-line bg-panel p-1 text-sm text-muted md:flex">
          <Link className="rounded-md px-3 py-1.5 hover:bg-canvas hover:text-ink" href="/upload">Upload</Link>
          <Link className="rounded-md px-3 py-1.5 hover:bg-canvas hover:text-ink" href="/app">Dashboard</Link>
          <Link className="rounded-md px-3 py-1.5 hover:bg-canvas hover:text-ink" href="/gallery">Gallery</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button className="rounded-md border border-line bg-panel px-3 py-2 text-xs font-medium uppercase tracking-wide" onClick={onPlanToggle}>{planType}</button>
          <Link className="inline-flex items-center gap-2 rounded-md bg-ink px-3 py-2 text-sm font-medium text-canvas" href="/login">
            <LogIn size={15} />
            {isSignedIn ? "Account" : "Sign in"}
          </Link>
        </div>
      </div>
    </header>
  );
}

function UploadView({
  dataset,
  isParsing,
  isAiLoading,
  notice,
  onFile,
  onSample,
}: {
  dataset: ParsedDataset;
  isParsing: boolean;
  isAiLoading: boolean;
  notice: string;
  onFile: (file?: File) => void;
  onSample: () => void;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[390px_minmax(0,1fr)]">
      <aside className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted">Upload workspace</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">Turn messy spreadsheets into calm dashboards.</h1>
        </div>
        <Dropzone isParsing={isParsing} onFile={onFile} onSample={onSample} />
        <SchemaPanel dataset={dataset} />
      </aside>
      <section className="space-y-4">
        <SummaryHeader dataset={dataset} isAiLoading={isAiLoading} />
        <DynamicDashboard dataset={dataset} />
        <StatusBar>{notice}</StatusBar>
      </section>
    </div>
  );
}

function DashboardView({
  dataset,
  isParsing,
  isAiLoading,
  notice,
  planType,
  onFile,
  onSample,
  onAi,
}: {
  dataset: ParsedDataset;
  isParsing: boolean;
  isAiLoading: boolean;
  notice: string;
  planType: "free" | "pro";
  onFile: (file?: File) => void;
  onSample: () => void;
  onAi: () => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="space-y-4">
        <Dropzone isParsing={isParsing} onFile={onFile} onSample={onSample} compact />
        <SchemaPanel dataset={dataset} />
        <SharedLinkPanel dataset={dataset} />
      </aside>
      <section className="space-y-5">
        <SummaryHeader dataset={dataset} isAiLoading={isAiLoading} />
        <DynamicDashboard dataset={dataset} />
        <div className="grid gap-4 md:grid-cols-2">
          <Paywalled planType={planType} title="Export to PDF">
            <button className="w-full rounded-md bg-ink px-4 py-3 text-sm font-semibold text-canvas">Generate PDF report</button>
          </Paywalled>
          <Paywalled planType={planType} title="AI Deep Insights">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-semibold text-canvas" onClick={onAi}>
              <Wand2 size={16} />
              Refresh AI analysis
            </button>
          </Paywalled>
        </div>
        <StatusBar>{notice}</StatusBar>
      </section>
    </div>
  );
}

function Dropzone({ isParsing, compact, onFile, onSample }: { isParsing: boolean; compact?: boolean; onFile: (file?: File) => void; onSample: () => void }) {
  const [isOver, setIsOver] = useState(false);

  function drop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsOver(false);
    onFile(event.dataTransfer.files?.[0]);
  }

  return (
    <section className="rounded-lg border border-line bg-panel p-3 shadow-sm">
      <label
        className={clsx(
          "flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed px-5 text-center transition",
          compact ? "py-8" : "py-14",
          isOver ? "border-ink bg-ink/[0.03]" : "border-line bg-canvas/60 hover:border-muted hover:bg-ink/[0.02]",
        )}
        onDragOver={(event) => {
          event.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={drop}
      >
        {isParsing ? <Loader2 className="mb-3 animate-spin text-ink" size={28} /> : <UploadCloud className="mb-3 text-ink" size={28} />}
        <span className="text-sm font-medium">{isParsing ? "Parsing file..." : "Drop CSV or Excel here"}</span>
        <span className="mt-1 text-xs text-muted">Subtle, private, client-side parsing.</span>
        <input className="sr-only" type="file" accept=".csv,.xls,.xlsx" onChange={(event) => onFile(event.target.files?.[0])} />
      </label>
      <button className="mt-3 w-full rounded-md border border-line bg-panel px-4 py-2.5 text-sm font-medium hover:bg-canvas" onClick={onSample}>
        Load sample dataset
      </button>
    </section>
  );
}

function SummaryHeader({ dataset, isAiLoading }: { dataset: ParsedDataset; isAiLoading: boolean }) {
  const summary = dataset.summary.ai?.summary ?? `Chartify detected ${dataset.summary.rows.toLocaleString()} rows and ${dataset.summary.columns} columns. Upload a file to generate AI-written context and chart recommendations.`;

  return (
    <header className="rounded-lg border border-line bg-panel p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-muted">{dataset.fileName}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Business overview</h2>
          <p className="mt-3 text-sm leading-6 text-muted">{summary}</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {dataset.summary.metrics.map((metric) => (
            <div key={metric.label} className="min-w-24 rounded-md border border-line bg-canvas px-3 py-2">
              <p className="text-lg font-semibold">{metric.value}</p>
              <p className="text-[11px] text-muted">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
      {isAiLoading && <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted"><Loader2 size={13} className="animate-spin" /> Asking OpenAI for a strict JSON dashboard plan...</p>}
    </header>
  );
}

function DynamicDashboard({ dataset }: { dataset: ParsedDataset }) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {dataset.summary.recommendations.map((chart) => (
        <ChartCard key={chart.id} dataset={dataset} chart={chart} />
      ))}
    </div>
  );
}

function ChartCard({ dataset, chart }: { dataset: ParsedDataset; chart: ChartRecommendation }) {
  const ref = useRef<HTMLDivElement>(null);
  const data = useMemo(() => aggregateForChart(dataset.rows, chart), [dataset.rows, chart]);

  async function downloadPng() {
    if (!ref.current) return;
    const { toPng } = await import("html-to-image");
    const link = document.createElement("a");
    link.download = `${chart.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
    link.href = await toPng(ref.current, { backgroundColor: "#ffffff", pixelRatio: 2 });
    link.click();
  }

  return (
    <article ref={ref} className="rounded-lg border border-line bg-panel p-4 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">{chart.title}</h3>
          <p className="mt-1 text-xs text-muted">{chart.chartType} chart · {chart.confidence}% match</p>
        </div>
        <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line hover:bg-canvas" onClick={downloadPng} aria-label="Download as PNG">
          <Download size={15} />
        </button>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {chart.kind === "Line" ? (
            <LineChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 4 }}>
              <CartesianGrid stroke="#e5e5e5" strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line dataKey="value" stroke="#111111" strokeWidth={2.5} dot={false} />
            </LineChart>
          ) : chart.kind === "Area" ? (
            <AreaChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 4 }}>
              <defs>
                <linearGradient id={`fill-${chart.id}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#111111" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="#111111" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#e5e5e5" strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area dataKey="value" stroke="#111111" fill={`url(#fill-${chart.id})`} strokeWidth={2.5} />
            </AreaChart>
          ) : chart.kind === "Pie" ? (
            <PieChart>
              <Tooltip />
              <Pie
                cx="50%"
                cy="50%"
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius="46%"
                isAnimationActive={false}
                minAngle={3}
                outerRadius="78%"
                paddingAngle={3}
              >
                {data.map((_, index) => <Cell key={index} fill={palette[index % palette.length]} />)}
              </Pie>
            </PieChart>
          ) : chart.kind === "Scatter" ? (
            <ScatterChart margin={{ top: 16, right: 16, left: 0, bottom: 4 }}>
              <CartesianGrid stroke="#e5e5e5" strokeDasharray="3 3" />
              <XAxis dataKey="x" name={chart.xKey} tick={{ fontSize: 11 }} type="number" />
              <YAxis dataKey="y" name={chart.yKey} tick={{ fontSize: 11 }} type="number" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={data} fill="#111111" />
            </ScatterChart>
          ) : chart.kind === "Radial" ? (
            <RadarChart data={data} outerRadius="78%">
              <PolarGrid stroke="#e5e5e5" />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis tick={{ fontSize: 10 }} />
              <Radar dataKey="value" stroke="#111111" fill="#111111" fillOpacity={0.16} isAnimationActive={false} />
              <Tooltip />
            </RadarChart>
          ) : (
            <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 4 }}>
              <CartesianGrid stroke="#e5e5e5" strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {data.map((_, index) => <Cell key={index} fill={palette[index % palette.length]} />)}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </article>
  );
}

function SchemaPanel({ dataset }: { dataset: ParsedDataset }) {
  return (
    <section className="rounded-lg border border-line bg-panel p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <FileSpreadsheet size={16} />
        <h2 className="text-sm font-semibold">Inferred schema</h2>
      </div>
      <div className="space-y-2">
        {dataset.summary.profiles.slice(0, 8).map((profile) => (
          <div key={profile.name} className="flex items-center justify-between gap-3 rounded-md bg-canvas px-3 py-2">
            <span className="truncate text-sm">{profile.name}</span>
            <span className="rounded bg-panel px-2 py-1 text-[11px] font-medium text-muted">{profile.type}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SharedLinkPanel({ dataset }: { dataset: ParsedDataset }) {
  const [shareId, setShareId] = useState("");

  async function createLink() {
    const id = crypto.randomUUID();
    localStorage.setItem(`chartify-share-${id}`, JSON.stringify(dataset));
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      await supabase.from("dashboards").insert({
        title: dataset.fileName,
        source_file_name: dataset.fileName,
        parsed_json: dataset,
        ai_insights: dataset.summary.ai ?? null,
        share_id: id,
        plan_type: "free",
      });
    }
    setShareId(`${window.location.origin}/share/${id}`);
  }

  return (
    <section className="rounded-lg border border-line bg-panel p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <Share2 size={16} />
        <h2 className="text-sm font-semibold">Shared link</h2>
      </div>
      <button className="w-full rounded-md bg-ink px-3 py-2 text-sm font-semibold text-canvas" onClick={createLink}>Generate UUID link</button>
      {shareId && <p className="mt-3 break-all rounded-md bg-canvas p-3 text-xs text-muted">{shareId}</p>}
    </section>
  );
}

function Paywalled({ planType, title, children }: { planType: "free" | "pro"; title: string; children: ReactNode }) {
  const locked = planType === "free";
  return (
    <section className="relative overflow-hidden rounded-lg border border-line bg-panel p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      <div className={clsx(locked && "pointer-events-none select-none blur-sm")}>{children}</div>
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center bg-panel/65">
          <div className="rounded-md border border-line bg-canvas px-4 py-3 text-center shadow-sm">
            <Lock className="mx-auto mb-2" size={17} />
            <p className="text-sm font-semibold">Upgrade to Pro</p>
            <p className="mt-1 text-xs text-muted">Available for paid dashboards.</p>
          </div>
        </div>
      )}
    </section>
  );
}

function AuthScreen({ onDemo }: { onDemo: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-4 text-ink">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-semibold">Sign in to Chartify</h1>
          <p className="text-sm text-muted">Supabase auth form styled with shadcn UI primitives.</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="name@company.com" type="email" />
          <Input placeholder="Password" type="password" />
          <Button className="w-full">Login / Sign up</Button>
          <Button className="w-full" variant="outline" onClick={onDemo}>Continue with demo</Button>
        </CardContent>
      </Card>
    </main>
  );
}

function ProjectGallery() {
  const items = ["Revenue analysis", "Marketing funnel", "Inventory tracker"];
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <AppHeader isSignedIn planType="free" onPlanToggle={() => undefined} />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-center gap-2">
          <GalleryVerticalEnd size={20} />
          <h1 className="text-3xl font-semibold">Project Gallery</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <article key={item} className="rounded-lg border border-line bg-panel p-5 shadow-sm">
              <Sparkles size={18} />
              <h2 className="mt-5 font-semibold">{item}</h2>
              <p className="mt-2 text-sm text-muted">Saved dashboard metadata belongs in the Supabase dashboards table.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function StatusBar({ children }: { children: ReactNode }) {
  return <p className="rounded-lg border border-line bg-panel px-4 py-3 text-sm text-muted">{children}</p>;
}

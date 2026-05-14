import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  Database,
  FileSpreadsheet,
  GalleryVerticalEnd,
  Lock,
  PieChart,
  Share2,
  Sparkles,
  UploadCloud,
  Wand2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const features: Array<[string, string, LucideIcon]> = [
  ["CSV and Excel parsing", "Upload CSV, XLS, or XLSX files and let Chartify normalize messy spreadsheet values in the browser.", FileSpreadsheet],
  ["Smart schema detection", "The engine scans the first 50 rows and identifies dates, currency, numbers, percentages, and text columns.", Database],
  ["AI chart planning", "OpenAI receives a compact schema plus a five-row sample, then returns summary, insights, and chart recommendations.", BrainCircuit],
  ["Dynamic dashboards", "Recommended bar, line, area, pie, scatter, and radial charts render automatically in a responsive grid.", BarChart3],
  ["Shareable reports", "Generate UUID links for dashboards and keep project metadata ready for Supabase storage.", Share2],
  ["Pro-ready paywalls", "PDF export and deeper AI analysis are already modeled as upgrade moments for free users.", Lock],
];

const workflow = [
  ["Upload", "Drop a spreadsheet into a minimal workspace. Chartify parses it client-side and keeps the original file out of your server path."],
  ["Understand", "Columns are typed, dirty currency and percentage values are cleaned, and a dashboard-ready dataset is stored globally."],
  ["Generate", "AI explains the dataset in plain English and recommends the charts most likely to answer the first business questions."],
  ["Share", "Save dashboards, send a unique link, or keep premium exports behind a simple Pro upgrade flow."],
];

const chartTypes = ["Bar", "Line", "Area", "Pie", "Scatter", "Radial"];

export function LandingPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="sticky top-0 z-30 border-b border-line bg-canvas/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link className="flex items-center gap-3" href="/">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-canvas">
              <BarChart3 size={19} />
            </span>
            <span>
              <span className="block text-sm font-semibold leading-4">Chartify</span>
              <span className="block text-xs text-muted">AI spreadsheet dashboards</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            <a className="hover:text-ink" href="#features">Features</a>
            <a className="hover:text-ink" href="#workflow">Workflow</a>
            <a className="hover:text-ink" href="#pricing">Pricing</a>
            <Link className="hover:text-ink" href="/gallery">Gallery</Link>
          </nav>
          <Link className="rounded-md bg-ink px-4 py-2 text-sm font-medium text-canvas" href="/upload">Start free</Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-md border border-line bg-panel px-3 py-1 text-xs font-medium text-muted">
            <Sparkles size={14} />
            From raw spreadsheet to executive dashboard
          </div>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Dashboards from spreadsheets, without the BI ceremony.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted">
            Chartify helps teams upload CSV or Excel files, clean the data, infer the schema, ask AI for the right analysis, and publish a polished dashboard in minutes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="inline-flex items-center justify-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-canvas" href="/upload">
              Upload data
              <ArrowRight size={16} />
            </Link>
            <Link className="inline-flex items-center justify-center rounded-md border border-line bg-panel px-5 py-3 text-sm font-semibold" href="/app">
              Open sample dashboard
            </Link>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            {["6 chart types", "5-row AI sample", "50-row schema scan"].map((item) => (
              <div key={item} className="rounded-md border border-line bg-panel px-3 py-2">
                <p className="text-sm font-semibold">{item.split(" ")[0]}</p>
                <p className="text-xs text-muted">{item.split(" ").slice(1).join(" ")}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-line bg-panel p-4 shadow-sm">
          <div className="rounded-md border border-line bg-canvas p-4">
            <div className="mb-4 flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold">Revenue performance</p>
                <p className="text-sm text-muted">Generated from startup-revenue.csv</p>
              </div>
              <span className="w-fit rounded-md border border-line bg-panel px-2 py-1 text-xs">AI recommended</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {["12,408 rows", "18 columns", "94% complete"].map((metric) => (
                <div key={metric} className="rounded-md border border-line bg-panel p-3">
                  <p className="text-lg font-semibold">{metric.split(" ")[0]}</p>
                  <p className="text-xs text-muted">{metric.split(" ").slice(1).join(" ")}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex h-72 items-end gap-3 rounded-md border border-line bg-panel p-4">
              {[42, 64, 51, 80, 72, 94, 68, 88, 76, 96].map((height, index) => (
                <div key={index} className="flex flex-1 items-end rounded-t-md bg-neutral-200">
                  <div className="w-full rounded-t-md bg-ink" style={{ height: `${height}%` }} />
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <PreviewNote icon={BrainCircuit} text="Revenue is concentrated in paid channels, but conversion quality is strongest in email." />
              <PreviewNote icon={PieChart} text="Chartify recommends bar, line, pie, scatter, radial, and area views for this dataset." />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-line bg-panel py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium text-muted">Product details</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Everything needed for a first-pass analytics product.</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Chartify is built around a reusable data engine, AI-assisted recommendations, and a clean dashboard surface that can grow into a SaaS workflow.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map(([title, body, Icon]) => (
              <article key={title} className="rounded-lg border border-line bg-canvas p-5">
                <Icon size={18} />
                <h3 className="mt-5 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[340px_minmax(0,1fr)]">
          <div>
            <p className="text-sm font-medium text-muted">Workflow</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">A guided path from upload to share link.</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              The app is designed for people who have business data but do not want to build formulas, SQL queries, or chart configs by hand.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {workflow.map(([title, body], index) => (
              <article key={title} className="rounded-lg border border-line bg-panel p-5">
                <p className="mb-5 flex h-8 w-8 items-center justify-center rounded-md bg-ink text-sm font-semibold text-canvas">{index + 1}</p>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-panel py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-medium text-muted">Dashboard output</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Six visual views, generated from the same dataset.</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Chartify picks chart types based on detected columns and AI guidance, then renders them in a responsive Recharts dashboard.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {chartTypes.map((type) => (
              <div key={type} className="rounded-lg border border-line bg-canvas p-4">
                <BarChart3 size={16} />
                <p className="mt-6 font-semibold">{type}</p>
                <p className="mt-1 text-xs text-muted">Auto-rendered card</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_420px]">
          <div className="rounded-lg border border-line bg-panel p-6">
            <Wand2 size={20} />
            <h2 className="mt-6 text-3xl font-semibold tracking-tight">Built for freemium analytics.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
              Free users can upload data, preview dashboards, and generate share links. Premium moments are already modeled for PDF export and deeper AI insights.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Client-side privacy-first parsing", "Supabase-ready auth and storage", "UUID shared dashboard links", "Upgrade CTAs for Pro features"].map((item) => (
                <p key={item} className="flex items-center gap-2 text-sm text-muted">
                  <Check size={15} className="text-ink" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-line bg-ink p-6 text-canvas">
            <p className="text-sm text-canvas/70">Pro plan</p>
            <p className="mt-3 text-4xl font-semibold">$19</p>
            <p className="mt-2 text-sm text-canvas/70">Per workspace, per month</p>
            <div className="mt-6 space-y-3 text-sm">
              {["PDF exports", "AI deep insights", "Saved project gallery", "Shareable dashboard history"].map((item) => (
                <p key={item} className="flex items-center gap-2">
                  <Check size={15} />
                  {item}
                </p>
              ))}
            </div>
            <Link className="mt-8 inline-flex w-full items-center justify-center rounded-md bg-canvas px-4 py-3 text-sm font-semibold text-ink" href="/upload">
              Try Chartify
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-panel px-4 py-14 text-center">
        <GalleryVerticalEnd className="mx-auto" size={22} />
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight">Bring your next spreadsheet and let Chartify make the first dashboard.</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted">
          Upload a sample file, inspect the schema, and move straight into chart recommendations.
        </p>
        <Link className="mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-canvas" href="/upload">
          Start with a file
          <UploadCloud size={16} />
        </Link>
      </section>

      <footer className="px-4 py-8 text-center text-sm text-muted">
        <Lock className="mr-2 inline" size={14} />
        Client-side parsing, AI schema summaries, Supabase-ready storage, and Pro paywalls.
      </footer>
    </main>
  );
}

function PreviewNote({ icon: Icon, text }: { icon: LucideIcon; text: string }) {
  return (
    <div className="flex gap-3 rounded-md border border-line bg-panel p-3 text-sm text-muted">
      <Icon className="mt-0.5 shrink-0 text-ink" size={16} />
      <span>{text}</span>
    </div>
  );
}

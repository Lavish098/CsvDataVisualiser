import Link from "next/link";

export default function SharedDashboardPage({ params }: { params: { id: string } }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-4 text-ink">
      <section className="w-full max-w-xl rounded-lg border border-line bg-panel p-6 text-center shadow-sm">
        <p className="text-sm font-medium text-muted">Shared dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold">Chartify link ready</h1>
        <p className="mt-3 break-all rounded-md bg-canvas p-3 text-sm text-muted">{params.id}</p>
        <p className="mt-4 text-sm leading-6 text-muted">
          In production this UUID resolves to a row in the Supabase dashboards table and renders the stored parsed JSON plus AI insights.
        </p>
        <Link className="mt-6 inline-flex rounded-md bg-ink px-4 py-2 text-sm font-semibold text-canvas" href="/app">
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}

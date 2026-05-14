# Datapilot AI

A modern Next.js CSV and Excel analytics app for non-technical users.

## What is included

- CSV, XLS, and XLSX upload
- Browser-only parsing for privacy
- Automatic column type detection and mapping
- Smart chart recommendations with Recharts
- Generated dashboards, metrics, and plain-English insights
- PNG and PDF export
- Share-link and saved-dashboard placeholders
- Dark/light mode
- Supabase-ready architecture notes
- Dormant OpenAI API route at `app/api/ai/insights/route.ts`

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Enable AI later

Add an environment variable when you have a key:

```bash
OPENAI_API_KEY=your_key_here
```

Without the key, the product uses local deterministic insights and the AI endpoint returns a dormant response.

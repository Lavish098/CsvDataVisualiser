import { NextResponse } from "next/server";
import type { AiDashboardResponse } from "@/types/analytics";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  const payload = await request.json();

  if (!apiKey) {
    return NextResponse.json(fallbackResponse(payload));
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are Chartify, a senior business data analyst. Return only valid JSON. Do not wrap the JSON in markdown. Do not include comments or trailing commas.",
        },
        {
          role: "user",
          content: [
            "Analyze this dataset schema and 5-row sample.",
            "Return exactly this JSON shape:",
            '{"summary":"Two concise plain-English sentences explaining what the dataset is.","recommendedCharts":[{"chartType":"Bar|Line|Area|Pie|Scatter|Radial","xAxis":"column_name","yAxis":"column_name"}],"keyInsights":["insight 1","insight 2","insight 3"]}',
            "Rules: recommendedCharts must contain 2 to 6 items; chartType must be one of Bar, Line, Area, Pie, Scatter, Radial; xAxis and yAxis must be exact column names from the schema; keyInsights must contain exactly 3 strings.",
            JSON.stringify(payload),
          ].join("\n"),
        },
      ],
    }),
  });

  if (!response.ok) {
    return NextResponse.json(fallbackResponse(payload), { status: 200 });
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  try {
    return NextResponse.json(normalizeAiResponse(JSON.parse(content)));
  } catch {
    return NextResponse.json(fallbackResponse(payload));
  }
}

function normalizeAiResponse(value: AiDashboardResponse): AiDashboardResponse {
  return {
    summary: String(value.summary ?? "This dataset is ready for a first-pass business dashboard. Chartify found enough structure to recommend visual views."),
    recommendedCharts: (value.recommendedCharts ?? []).slice(0, 6).map((chart) => ({
      chartType: chart.chartType,
      xAxis: chart.xAxis,
      yAxis: chart.yAxis,
    })),
    keyInsights: (value.keyInsights ?? []).slice(0, 3),
  };
}

function fallbackResponse(payload: { schema?: Array<{ name: string; type: string }> }): AiDashboardResponse {
  const schema = payload?.schema ?? [];
  const xAxis = schema.find((column) => column.type === "Date")?.name ?? schema.find((column) => column.type === "String")?.name ?? schema[0]?.name ?? "Records";
  const yAxis = schema.find((column) => ["Currency", "Number", "Percentage"].includes(column.type))?.name ?? schema[1]?.name ?? xAxis;

  return {
    summary: `This dataset contains structured spreadsheet records with ${schema.length} detected columns. Chartify can use the schema to build a practical dashboard focused on ${yAxis}.`,
    recommendedCharts: [
      { chartType: "Bar", xAxis, yAxis },
      { chartType: "Line", xAxis, yAxis },
      { chartType: "Area", xAxis, yAxis },
      { chartType: "Pie", xAxis, yAxis },
      { chartType: "Scatter", xAxis: yAxis, yAxis },
      { chartType: "Radial", xAxis, yAxis },
    ],
    keyInsights: [
      `Start by comparing ${yAxis} across ${xAxis} to find concentration.`,
      "Review missing or unusually formatted values before relying on totals.",
      "Use the first recommended chart as the executive summary view.",
    ],
  };
}

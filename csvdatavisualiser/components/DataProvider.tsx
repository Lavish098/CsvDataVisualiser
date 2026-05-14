"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { makeDataset } from "@/lib/analytics";
import type { AiDashboardResponse, ParsedDataset } from "@/types/analytics";

const sampleRows = [
  { Month: "2026-01-01", Channel: "Website", Revenue: "$42,800", Orders: "384", Conversion: "3.1%" },
  { Month: "2026-02-01", Channel: "Website", Revenue: "$45,250", Orders: "411", Conversion: "3.3%" },
  { Month: "2026-03-01", Channel: "Partners", Revenue: "$50,100", Orders: "438", Conversion: "3.6%" },
  { Month: "2026-04-01", Channel: "Partners", Revenue: "$31,800", Orders: "214", Conversion: "2.4%" },
  { Month: "2026-05-01", Channel: "Email", Revenue: "$34,600", Orders: "229", Conversion: "2.7%" },
  { Month: "2026-06-01", Channel: "Paid Ads", Revenue: "$62,200", Orders: "501", Conversion: "2.9%" },
  { Month: "2026-07-01", Channel: "Retail", Revenue: "$68,100", Orders: "422", Conversion: "4.6%" },
];

type DataContextValue = {
  dataset: ParsedDataset;
  setDatasetFromRows: (fileName: string, rows: Record<string, unknown>[], ai?: AiDashboardResponse) => ParsedDataset;
  setAiInsights: (ai: AiDashboardResponse) => void;
  loadSample: () => void;
  planType: "free" | "pro";
  setPlanType: (plan: "free" | "pro") => void;
};

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [dataset, setDataset] = useState(() => makeDataset("chartify-sample.csv", sampleRows));
  const [planType, setPlanType] = useState<"free" | "pro">("free");

  const value = useMemo<DataContextValue>(
    () => ({
      dataset,
      setDatasetFromRows(fileName, rows, ai) {
        const next = makeDataset(fileName, rows, ai);
        setDataset(next);
        return next;
      },
      setAiInsights(ai) {
        setDataset((current) => makeDataset(current.fileName, current.rows, ai));
      },
      loadSample() {
        setDataset(makeDataset("chartify-sample.csv", sampleRows));
      },
      planType,
      setPlanType,
    }),
    [dataset, planType],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDataStore() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useDataStore must be used inside DataProvider");
  return context;
}

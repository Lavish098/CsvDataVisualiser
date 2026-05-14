import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DataProvider } from "@/components/DataProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chartify | AI CSV Dashboards",
  description: "Client-side CSV and Excel parsing with AI-generated chart dashboards.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}

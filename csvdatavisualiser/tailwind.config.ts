import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: "hsl(var(--canvas))",
        panel: "hsl(var(--panel))",
        ink: "hsl(var(--ink))",
        muted: "hsl(var(--muted))",
        line: "hsl(var(--line))",
        brand: "hsl(var(--brand))",
        accent: "hsl(var(--accent))",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 80px -36px rgba(15, 23, 42, 0.35)",
        glow: "0 20px 70px -42px rgba(58, 112, 245, 0.9)",
      },
    },
  },
  plugins: [],
};

export default config;

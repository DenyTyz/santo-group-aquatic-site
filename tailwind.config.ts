import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ocean: {
          950: "#04151f",
          900: "#071e2b",
          800: "#0c2e3b",
          700: "#124452",
        },
        aqua: {
          300: "#73eee0",
          400: "#42d5ca",
          500: "#1eb9b1",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Arial", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 70px rgba(66, 213, 202, .18)",
      },
    },
  },
  plugins: [],
};

export default config;

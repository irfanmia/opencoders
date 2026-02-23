import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brutal: {
          bg: "#ffffff",
          card: "#ffffff",
          muted: "#f5f5f4",
          border: "#000000",
          lime: "#a3e635",
          pink: "#ec4899",
          blue: "#3b82f6",
          yellow: "#facc15",
          cyan: "#22d3ee",
          orange: "#f97316",
          red: "#ef4444",
        },
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px #000000",
        "brutal-sm": "2px 2px 0px 0px #000000",
        "brutal-lg": "6px 6px 0px 0px #000000",
        "brutal-lime": "4px 4px 0px 0px #a3e635",
        "brutal-pink": "4px 4px 0px 0px #ec4899",
        "brutal-blue": "4px 4px 0px 0px #3b82f6",
        "brutal-yellow": "4px 4px 0px 0px #facc15",
      },
      borderWidth: {
        3: "3px",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        bold: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

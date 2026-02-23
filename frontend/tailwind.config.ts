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
          muted: "#F5FBF5",
          border: "#000000",
          green: "#2BA24C",
          "green-dark": "#1a7a35",
          "green-light": "#E8F5E9",
          "green-accent": "#4CAF50",
          "green-pale": "#F0FFF0",
          // keep legacy names pointing to green shades for any stragglers
          lime: "#2BA24C",
          pink: "#2BA24C",
          blue: "#1a7a35",
          yellow: "#E8F5E9",
          cyan: "#4CAF50",
          orange: "#2BA24C",
          red: "#ef4444",
        },
      },
      boxShadow: {
        brutal: "3px 3px 0px 0px rgba(0,0,0,0.15)",
        "brutal-sm": "2px 2px 0px 0px rgba(0,0,0,0.12)",
        "brutal-lg": "4px 4px 0px 0px rgba(0,0,0,0.18)",
        "brutal-green": "3px 3px 0px 0px #2BA24C",
        "brutal-green-light": "3px 3px 0px 0px #4CAF50",
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

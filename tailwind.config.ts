import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#08101C",
          900: "#0E1B2E",
          800: "#16253B",
          700: "#1E3557",
          600: "#2B4C7E",
        },
        gold: {
          400: "#FFD043",
          500: "#FFC20E",
          600: "#E5AB00",
          700: "#B8860B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

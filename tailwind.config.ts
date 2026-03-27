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
        background: "#0A0A0F",
        surface: "#12101A",
        "deep-surface": "#1E1530",
        primary: "#9D6FE8",
        "primary-hover": "#B892F5",
        "primary-mid": "#7B4FD4",
        "primary-dark": "#4A2D8F",
        "border-custom": "#2E1F5E",
        "on-surface": "#F5F3FF",
        "muted-text": "#A89EC4",
      },
      fontFamily: {
        headline: ["Bebas Neue", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        studio: ["Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0px",
        lg: "0px",
        xl: "0px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;

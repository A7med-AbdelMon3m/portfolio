import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sheet: { DEFAULT: token("sheet"), raised: token("sheet-raised") },
        ink: { DEFAULT: token("ink"), soft: token("ink-soft") },
        line: token("line"),
        blue: token("blue"),
        amber: token("amber"),
        earth: token("earth"),
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', '"IBM Plex Sans Arabic"', "system-ui", "sans-serif"],
        display: ['"IBM Plex Sans Condensed"', '"IBM Plex Sans Arabic"', "system-ui", "sans-serif"],
      },
      maxWidth: { page: "72rem", prose: "62ch" },
    },
  },
  plugins: [],
} satisfies Config;

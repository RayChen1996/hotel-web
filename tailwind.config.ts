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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // white: "#FFFFFF",
        gray: {
          100: "#E3E6E9",
          400: "#748290",
          700: "#2D3643",
        },
        blue: "#569DC3",
        // blackTransparent: "#00000029",
      },
    },
  },
  plugins: [],
};
export default config;

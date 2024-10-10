import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import daisyuiDefaultThemes from "daisyui/src/theming/themes";
import defaultTheme from "tailwindcss/defaultTheme";
const config: Config = {
  darkMode: "class",
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
  plugins: [daisyui],
  daisyui: {
    darkTheme: "dark",
    themes: [
      {
        light: {
          ...daisyuiDefaultThemes.light,
          primary: "#569DC3",
          "primary-content": "#2D3643",
          secondary: "#748290",
          "secondary-content": "#F7D9BB",
          accent: "#E3E6E9",
          "accent-content": "#FFC29D",
        },
      },
      {
        dark: {
          ...daisyuiDefaultThemes.dark,
          primary: "#569DC3",
          "primary-content": "#569DC3",
          secondary: "#F0C7A7",
          "secondary-content": "#FAE5CC",
          accent: "#FF825C",
          "accent-content": "#FFC29D",
        },
      },
    ],
  },
};
export default config;

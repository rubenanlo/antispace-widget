/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
const scrollbarHide = require("tailwind-scrollbar-hide");

module.exports = {
  content: [
    "./pages/**/*.{js, jsx}",
    "./components/**/*.{js, jsx}",
    "./layout/**/*.{js, jsx}",
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "widget-card": "var(--widget-card)",
        "blue-primary": "var(--blue)",
        "green-primary": "var(--green)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        interphase: ["Interphase", ...fontFamily.sans],
      },
    },
  },
  plugins: [scrollbarHide],
};

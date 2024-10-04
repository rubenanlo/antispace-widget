/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";
const aspectRatio = require("@tailwindcss/aspect-ratio");
const scrollbarHide = require("tailwind-scrollbar-hide");
const forms = require("@tailwindcss/forms");

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
        "blue-primary": "var(--blue)",
        "green-primary": "var(--green)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        interphase: ["Interphase", ...fontFamily.sans],
      },
    },
  },
  plugins: [aspectRatio, scrollbarHide, forms],
};

/** @type {import('tailwindcss').Config} */
import flyonui from "flyonui";
import { addDynamicIconSelectors } from '@iconify/tailwind'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flyonui,
    addDynamicIconSelectors({
      prefix: "icon",
    }),
  ],
};
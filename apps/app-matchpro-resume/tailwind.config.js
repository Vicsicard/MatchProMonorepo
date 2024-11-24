/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../libs/ui/src/**/*.{js,ts,jsx,tsx}"
  ],
  presets: [
    require('../../libs/styles/tailwind.config.js')
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

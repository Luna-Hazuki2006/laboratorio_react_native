/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{tsx, jsx}", "./components/**/*.{tsx, jsx}"],
  presets: [require("nativewind/preset")], 
  theme: {
    extend: {},
  },
  plugins: [],
}



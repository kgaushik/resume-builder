/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      comorant: ["Cormorant Garamond", "serif"],
      sourceSan: ["Source Sans 3", "san-serif"],
    },
    extend: {},
  },
  plugins: [],
};

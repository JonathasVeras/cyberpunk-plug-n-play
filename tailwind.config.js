/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "yellow-punk": "#f3eb00",
        "pinkish-red": "#ef767a",
        "blue-punk": "#00ffff",
        "dark-purple": "#220425",
      },
    },
  },
  plugins: [],
};

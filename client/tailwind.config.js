/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5542f6",
        secondary: {
          100: "#161b22",
          200: "#0d1117",
          300: "#010409",
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      red: {
        50: "#fdf3f3",
        100: "#fce5e4",
        200: "#fbcecd",
        300: "#f7acaa",
        400: "#f07c79",
        500: "#e5524e",
        600: "#c6302c",
        700: "#b02925",
        800: "#922522",
        900: "#792523",
        950: "#410f0e",
      },
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
  },
  plugins: [],
};

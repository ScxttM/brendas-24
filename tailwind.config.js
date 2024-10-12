/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
          DEFAUL: "#c6302c",
        },
        gold: {
          light: "#f9e9a1",
          DEFAULT: "#d4af37",
          dark: "#b38a2a",
        },
        silver: {
          light: "#e0e0e0",
          DEFAULT: "#c0c0c0",
          dark: "#9e9e9e",
        },
        bronze: {
          light: "#cd7f32",
          DEFAULT: "#b87333",
          dark: "#8c5523",
        },
        white: {
          DEFAULT: "#ffffff",
        },
        black: {
          DEFAULT: "#000000",
        },
      },
    },
  },
  plugins: [],
};

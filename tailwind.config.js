/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  content: [],
  theme: {
    extend: {
      colors: {
        ohi: {
          base: "#3A2D26",
          front: "#AC9B92",
          accent: "#8C5B5B",
          text: { normal: "#292929", contrast: "#ffffff" },
        },
      },
      fontFamily: {
        playfair: ["'Playfair Display'", ...defaultTheme.fontFamily.serif],
        playfairsc: ["'Playfair Display SC'", ...defaultTheme.fontFamily.serif],
        lato: ["'Lato'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

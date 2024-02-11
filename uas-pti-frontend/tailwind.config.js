/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        heading: "linear-gradient(83.84deg, #0088ff -6.87%, #a033ff 26.54%, #ff5c87 58.58%)",
      },
      colors: {
        "prim-white": "rgba(255,255,255,.98)",
        border: "#385898",
        light: "#FAFAFA",
        green: " rgb(0, 104, 74)",
      },
    },
    fontFamily: {
      Inter: ["Inter", "sans-serif"],
      Calibre: ["Calibre", "Helvetica Neue", "Segoe UI", "Helvetica", "Arial", "Lucida Grande", "sans-serif"],
      Aksidenz: ["Akzidenz-Grotesk Std Light", "sans-serif"],
    },
  },
  plugins: [],
};

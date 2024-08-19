/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1e1e1e",
        },
        secondary: {},
        accent: {},
      },
      textColor: {
        primary: "#ffffff",
        secondary: "#e0e0e0",
        accent: "#ffffff",
        link: "#006FFD",
        error: {
          DEFAULT: "#c23616",
        },
      },
      borderColor: {
        primary: {
          DEFAULT: "#8F9098",
          selected: "#1e1e1e",
        },
        secondary: "#5c5c5c",
        accent: "#2980b9",
        error: {
          DEFAULT: "#c23616",
        },
      },
    },
  },
  plugins: [],
};

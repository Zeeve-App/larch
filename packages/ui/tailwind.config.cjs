const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      rubik: ["Rubik"],
    },
    extend: {
      colors: {
        dark: {
          50: "#e6e7e7",
          100: "#cecfd0",
          200: "#b5b7b8",
          300: "#9c9fa0",
          400: "#838788",
          500: "#6b6e71",
          600: "#525659",
          700: "#393e41",
          800: "#21262a",
          900: "#080e12",
        },
        larch: {
          pink: "#E6007A",
          yellow: "#FFC542",
          dark: "#090D11",
          dark_2: "#101519",
          dark_3: "#21262A",
          success: "#4FC898",
          warning: "#FFC542",
          info: "#1057FF",
          error: "#FF7F7F",
        },
      },
      zIndex: {
        dropdown: 500,
        overlay: 800,
        modal: 900,
        sidebar: 300
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addUtilities,theme }) {
      addBase({
        "*": {
          fontFamily: "Rubik",
        },
         h1: {
                fontSize: theme("fontSize.3xl"),
                fontWeight: theme("fontWeight.bold"),
                fontFamily: "Rubik",
            },
            h2: {
                fontSize: theme("fontSize.2xl"),
                fontWeight: theme("fontWeight.semibold"),
                fontFamily: "Rubik",
            },
            h3: {
                fontSize: theme("fontSize.xl"),
                fontWeight: theme("fontWeight.semibold"),
                fontFamily: "Rubik",
            },
            h4: {
                fontSize: theme("fontSize.lg"),
                fontWeight: theme("fontWeight.semibold"),
                fontFamily: "Rubik",
            },
            h5: {
                fontSize: theme("fontSize.base"),
                fontWeight: theme("fontWeight.semibold"),
                fontFamily: "Rubik",
            },
            h6: {
                fontSize: theme("fontSize.sm"),
                fontWeight: theme("fontWeight.semibold"),
                fontFamily: "Rubik",
            },
      });

      addUtilities({
        ".bg-brand-gradient": {
          background: "linear-gradient(90deg, #E6007A 0%, #9F125d 100%)",
        },
      });
    }),
  ],
};

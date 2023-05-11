/*
 * Copyright (C) Zeeve Inc.
 * This file is part of Larch.
 * Larch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Larch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Larch.  If not, see <http://www.gnu.org/licenses/>.
 */

const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
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
        brand: {
          blue: "#4054b2",
          red: "#FF7F7F",
          green: "#4FC898",
          yellow: "#FFC542",
          gray: "#21262A",
          dark: "#080e12",
          teal: "#32b8b2",
          cyan: "#088DB2",
          light: "#F8FAFA",
          outline: "#8F92A133",
          purple: "#4F47B4",
          pink: "#FF5592",
        },
      },
      zIndex: {
        sidebar: 300,
        dropdown: 500,
      }
    },
  },
  plugins: [
    plugin(function ({ addBase, addUtilities, theme }) {
      addBase({
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
    require("@tailwindcss/forms")({
      strategy: "base",
    }),
  ],
};

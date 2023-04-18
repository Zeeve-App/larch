/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    fontFamily: {
      'rubik': ['Rubik'],
    },
    extend: {
      colors: {
        'black': '#090D11',
        'white': '#FFFFFF',
        'create-button': '#101519',
        'border': '#21262A',
        'order': '#21262A',
        'light4': '#9C9FA0',
        'menu': '#080C0F',
        'orange': '#9F125D',
        'grey': '#21262A',
        'yellow': '#FFC542',
        'green': 'MediumSeaGreen',
        'dark-green': 'green',
        'toast': '#313131',
        'th-start': '#d20171',
        'th-end': '#a2115e',
      },
    },
  },
  plugins: [],
}

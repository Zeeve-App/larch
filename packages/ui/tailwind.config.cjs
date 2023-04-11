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
        'pink': '#E6007A',
        'orange': '#9F125D',
        'grey': '#21262A',
        'yellow': '#FFC542',
        'red': '#FF7F7F',
        'green': 'MediumSeaGreen',
        'dark-green': 'green',
      },
    },
  },
  plugins: [],
}

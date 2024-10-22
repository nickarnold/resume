/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ejs}"],
  theme: {
    fontFamily: {
      sans: ['"SackersGothic"', "sans-serif"],
      gruppo: ['"Gruppo"', "sans-serif"],
    },
    extend: {
      screens: {
        print: { raw: 'print' },
        screen: { raw: 'screen' },
      },
    },
  },
  plugins: [],
}

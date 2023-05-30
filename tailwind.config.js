/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/*.{html,js,jsx}','./components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'custom': ['GraphikRegular','GraphikLight','GraphikMedium','GraphikBold','InterRegular','InterBold','InterMedium'],
      },
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}", ],
  theme: {
    extend: {
      colors: {
        dark_blue: '#0f141e',
        dark_blue_s: '#21242e'
      },
      fontFamily: {
        sf_bold: ['San Francisco Bold'],
        sf_regular: ['San Francisco Regular']

      }
    },
  },
  plugins: [],
}

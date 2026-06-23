/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['"Fredoka One"', 'cursive'],
        'body': ['"Nunito"', 'sans-serif'],
      },
      colors: {
        'preedu-bg': '#FEFAF6',
        'preedu-dark': '#2B2D42',
        'preedu-blue': '#4D96FF',
        'preedu-green': '#6BCB77',
        'preedu-purple': '#9D4CDD',
        'preedu-yellow': '#FFD166',
        'preedu-orange': '#FF8C42',
      },
    },
  },
  plugins: [],
}

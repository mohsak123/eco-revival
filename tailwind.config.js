/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'eco-green': 'var(--eco-green)',
        'eco-green-dark': '#4ade80',
        'eco-gray': '#4b5563'
      }
    }
  },
  plugins: [],
}

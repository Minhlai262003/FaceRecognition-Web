/** @type {import('tailwindcss').Config} */

export default {
  important: true,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f2fbf5',
          100: '#d8f3e1',
          200: '#ade4c2',
          300: '#7ad59e',
          400: '#4ec679',
          500: '#20a84a',
          600: '#1b8f3f',
          700: '#157435',
          800: '#0f5929',
          900: '#093d1d',
        },
      },
    },
  },
  plugins: [],
}

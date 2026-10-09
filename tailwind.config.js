/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2bbef9',
          dark: '#0284c7',
          light: '#e0f2fe'
        },
        secondary: {
          DEFAULT: '#ed174a',
          hover: '#dc2626'
        },
        dark: '#1e293b'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}

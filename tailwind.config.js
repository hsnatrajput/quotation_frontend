/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          600: '#2563eb',
          700: '#1d4ed8',
        },
        neutral: {
          50: '#f9fafb',
          900: '#111827',
        },
      },
      backgroundImage: {
        'hero-pattern': "url('./assets/images/background-hero.jpg')",
      },
    },
  },
  plugins: [],
}
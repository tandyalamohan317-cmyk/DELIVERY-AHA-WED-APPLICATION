/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aha: {
          bg: '#080314',
          dark: '#0D0622',
          surface: '#140A34',
          gold: '#D4AF37',
          'gold-light': '#F3E5AB',
          'gold-dark': '#997A15',
          purple: '#3B1C82',
          indigo: '#1E1B4B',
        }
      },
      fontFamily: {
        royal: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.25)',
        'purple-glow': '0 0 30px rgba(59, 28, 130, 0.35)',
        'glass-card': '0 12px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

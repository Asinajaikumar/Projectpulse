/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070A11',
          900: '#0B0F19',
          850: '#101625',
          800: '#161F33',
          750: '#1D2A44',
          700: '#253556',
          600: '#344975',
        },
        pulse: {
          orange: '#FF5722',
          'orange-glow': '#FF6B35',
          'orange-dark': '#E04818',
          'orange-light': '#FF8A65',
        },
        status: {
          ontrack: '#10B981',
          atrisk: '#F59E0B',
          delayed: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 20px -3px rgba(255, 87, 34, 0.4)',
        'glow-orange-lg': '0 0 35px -5px rgba(255, 87, 34, 0.6)',
        'glow-green': '0 0 15px -3px rgba(16, 185, 129, 0.4)',
        'glow-red': '0 0 15px -3px rgba(239, 68, 68, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'fire-trail': 'fireTrail 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fireTrail: {
          '0%': { opacity: '1', transform: 'scale(1) translateX(0)' },
          '100%': { opacity: '0', transform: 'scale(1.5) translateX(-20px)' },
        }
      }
    },
  },
  plugins: [],
}

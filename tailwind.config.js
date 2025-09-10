/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fff0f5',
          100: '#ffe4ec',
          200: '#ffcce0',
          300: '#ffa3cc',
          400: '#ff69b4',
          500: '#ff1493',
          600: '#e6004d',
          700: '#cc0044',
          800: '#b3003b',
          900: '#990033',
        },
        secondary: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'particle': 'particle 6s ease-in infinite',
        'gradient': 'gradient 6s linear infinite',
        'bounce-slow': 'bounce 1.3s infinite',
        'shine': 'shine 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.02)' },
        },
        particle: {
          '0%': { transform: 'translateY(100vh) scale(0)', opacity: '0' },
          '50%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-100vh) scale(1)', opacity: '0' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        shine: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 200%' },
        }
      }
    },
  },
  plugins: [],
}

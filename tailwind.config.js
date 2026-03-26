/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#0f172a',
        accent: '#06b6d4',
        secondary: '#334155',
      },

      /* ANIMACIONES */
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        swiperProgress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },

      animation: {
        'fade-in-up': 'fadeInUp 0.9s ease-out forwards',
        swiperProgress: 'swiperProgress 3s linear infinite',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        progressGrow: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        swipeUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0.3' },
          '100%': { transform: 'translateY(-10px)', opacity: '1' },
        },
        swipeDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0.3' },
          '100%': { transform: 'translateY(10px)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-right': 'slideRight 0.5s ease-out forwards',
        'slide-left': 'slideLeft 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'rotate-slow': 'rotate 8s linear infinite',
        'progress': 'progressGrow 5s linear forwards',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
        'swipe-up': 'swipeUp 1.5s ease-in-out infinite',
        'swipe-down': 'swipeDown 1.5s ease-in-out infinite',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      colors: {
        'fashion-pink': '#FF3366',
        'fashion-purple': '#7928CA',
        'fashion-blue': '#2D9CDB',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


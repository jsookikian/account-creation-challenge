/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/frontend/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0 2px 6px #0000001a',
      },
      keyframes: {
        glow: {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 0%' },
        },
      },
      animation: {
        glow: 'glow 3s linear infinite',
      },
      colors: {
        primary: 'hsla(244,49%,49%,1)',
      },
    },
  },
  plugins: [],
};

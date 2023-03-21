// eslint-disable-next-line @typescript-eslint/no-var-requires
const { plum, blackA, mauve, whiteA } = require('@radix-ui/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...plum,
        ...blackA,
        ...mauve,
        ...whiteA,
      },
    },
    keyframes: {
      hide: {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
      slideIn: {
        from: { transform: 'translateY(calc(100% + var(--viewport-padding)))' },
        to: { transform: 'translateY(0))' },
      },
      swipeOut: {
        from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
        to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
      },
      spin: {
        to: {
          transform: 'rotate(360deg)',
        },
      },
    },
    animation: {
      hide: 'hide 200ms ease-in',
      slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      swipeOut: 'swipeOut 100ms ease-out',
      spin: 'spin 1s linear infinite',
    },
  },
  plugins: [],
}

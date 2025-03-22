/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ['var(--font-geist-sans)'],
        'geist-mono': ['var(--font-geist-mono)'],
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};

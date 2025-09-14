/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        geist: ['var(--font-geist-sans)'],
        'geist-mono': ['var(--font-geist-mono)'],
        inter: ['Inter', 'sans-serif']
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      }
    }
  },
  plugins: []
} satisfies Config;

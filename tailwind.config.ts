import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,md,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        dark: {
          content: '#0e1217',
          cards: '#1c1f26',
          buttons: '#20262d',
          hover: '#2d323c'
        }
      }
    }
  },
  plugins: []
} satisfies Config;

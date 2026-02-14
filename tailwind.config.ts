import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0e0e10',
        accent: '#1f6feb'
      }
    }
  },
  plugins: []
} satisfies Config;

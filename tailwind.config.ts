import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#FFC800',
          red: '#E3000B',
          dark: '#1A1A2E',
          light: '#FFF9E6',
          neutral: '#F8F7F4',
          muted: '#6B7280',
        },
        primary: {
          DEFAULT: '#FFC800',
          foreground: '#1A1A2E',
        },
        accent: {
          DEFAULT: '#E3000B',
          foreground: '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['Prompt', 'sans-serif'],
        body: ['Sarabun', 'sans-serif'],
      },
      borderRadius: {
        lg: '16px',
        md: '12px',
        sm: '8px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.14)',
        pill: '0 2px 12px rgba(255,200,0,0.35)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

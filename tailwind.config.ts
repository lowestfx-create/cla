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
          yellow: '#FFD700',
          red: '#DA291C',
          blue: '#006CB7',
          green: '#00A650',
          orange: '#FF6B00',
          dark: '#1A1A1A',
          light: '#FFFBF0',
          neutral: '#F5EFE0',
          muted: '#78716C',
          white: '#FFFFFF',
        },
        primary: {
          DEFAULT: '#FFD700',
          foreground: '#1A1A1A',
        },
        accent: {
          DEFAULT: '#DA291C',
          foreground: '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['Prompt', 'sans-serif'],
        body: ['Sarabun', 'sans-serif'],
      },
      borderRadius: {
        lg: '10px',
        md: '8px',
        sm: '6px',
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        brick: '4px 4px 0px #1A1A1A',
        'brick-sm': '2px 2px 0px #1A1A1A',
        'brick-lg': '6px 6px 0px #1A1A1A',
        'brick-xl': '8px 8px 0px #1A1A1A',
        'brick-yellow': '4px 4px 0px #FFD700',
        'brick-red': '4px 4px 0px #DA291C',
        'brick-blue': '4px 4px 0px #006CB7',
        'brick-green': '4px 4px 0px #00A650',
        card: '4px 4px 0px #1A1A1A',
        'card-hover': '6px 6px 0px #1A1A1A',
        pill: '3px 3px 0px rgba(0,0,0,0.25)',
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 8s linear infinite',
        wiggle: 'wiggle 0.4s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

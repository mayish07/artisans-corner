/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B45309',
          dark: '#92400E',
          light: '#FEF3C7',
        },
        secondary: '#1C1917',
        accent: '#D97706',
        success: '#059669',
        error: '#DC2626',
        background: '#FFFBF5',
        surface: '#FFFFFF',
        border: '#E7E5E4',
        stone: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Source Sans 3', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      borderRadius: {
        'card': '12px',
        'product': '16px',
        'button': '8px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.1)',
        'card-hover': '0 4px 6px rgba(0,0,0,0.1)',
        'modal': '0 25px 50px -12px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
}

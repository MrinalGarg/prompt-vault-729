/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        vault: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcd8ff',
          300: '#8ebcff',
          400: '#5b97ff',
          500: '#356ff5',
          600: '#244fd8',
          700: '#1f3fb0',
          800: '#20378b',
          900: '#1f316d'
        },
        signal: {
          50: '#f5f7ff',
          100: '#ecefff',
          200: '#d9ddff',
          300: '#b8bfff',
          400: '#8f97ff',
          500: '#6d6ef8',
          600: '#5754e8',
          700: '#473fc8',
          800: '#3b35a2',
          900: '#322f81'
        },
        ember: {
          50: '#fff5ed',
          100: '#ffe8d4',
          200: '#ffcba8',
          300: '#ffa36f',
          400: '#ff7a3d',
          500: '#ff5a1f',
          600: '#f03d0c',
          700: '#c72d0d',
          800: '#9e2712',
          900: '#7f2412'
        }
      },
      boxShadow: {
        glow: '0 20px 60px rgba(53, 111, 245, 0.18)'
      }
    },
  },
  plugins: [],
}

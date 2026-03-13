/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FAF7F2',
          100: '#F0E6D6',
          300: '#C9B99A',
          600: '#8B7355',
          900: '#5C4A3A',
        }
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}

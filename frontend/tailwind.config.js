/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors:{
        'primary':'#1B998B',
        'primary-dark':'#0F7A6D',
        'primary-light':'#E3F5F3',
        'accent':'#FF6B6B',
        'surface':'#F4FAFA',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 16px 0 rgba(27,153,139,0.08)',
        'card-hover': '0 8px 32px 0 rgba(27,153,139,0.16)',
      },
    },
  },
  plugins: [],
}
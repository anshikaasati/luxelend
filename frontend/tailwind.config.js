/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#9d174d',
          dark: '#831843',
          light: '#fb7185'
        },
        'primary-berry': '#9d174d',
        'primary-dark': '#831843',
        'secondary-gold': '#ca8a04',
        'secondary-dark': '#a16207'
      }
    }
  },
  plugins: []
};



module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        anuphan: ['Anuphan'],
      },
    },
  },
  variants: {
    extend: {},
    boxShadow: ['active'],
  },
  plugins: [],
}

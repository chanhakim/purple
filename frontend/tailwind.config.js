const { gray } = require('tailwindcss/colors')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      gray: gray,
      purple: {
        light: '#E9E7FC',
        dark: '#7F19E5'
      },
      red: colors.red,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

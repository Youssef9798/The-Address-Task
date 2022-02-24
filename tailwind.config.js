module.exports = {
  purge: [],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add extra paths here
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      'primary-color': '#0835C4'
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  mode: 'jit',
  content: [],
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "highlight-color": "var(--highlight-color)",
        "foreground-color": "var(--foreground-color)",
        "background-color": "var(--background-color)"
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      background: '#343a46',
      backgroundNavbar: '#343a46',
      backgroundCard: '#b1bbc8',
      textColorNavbar: '#f6f7f9',
      textColorCard: '#64748b',
      textEvent: '#f6f7f9',
      hoverTextColorNavbar: '#eceef2',
      buttonHover: '#526077',
      lynch: {
        50: '#f6f7f9',
        100: '#eceef2',
        200: '#d5d9e2',
        300: '#b1bbc8',
        400: '#8695aa',
        500: '#64748b',
        600: '#526077',
        700: '#434e61',
        800: '#3a4252',
        900: '#343a46',
        950: '#23272e',
      },
    },
    extend: {
      colors: {
        gradient1BackgroundCard: '#b1bbc8',
        gradient2BackgroundCard: '#526077',
      },
    },
  },
};

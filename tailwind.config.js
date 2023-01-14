module.exports = {
  content: ['./src/**/*.{tsx,ts}'],

  theme: {
    extend: {
      colors: {
        primary: '#414FA8',
        secondary: '#dcdcdc',
        tertiary: '#F3F3F3',
        black: '#1a1a1a',
      },

      screens: {
        xs: { max: '576px' },
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
      },

      container: {
        center: true,
      },
    },
  },

  plugins: [],
};

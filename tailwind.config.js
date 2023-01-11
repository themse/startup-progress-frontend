module.exports = {
  content: ['./src/**/*.{tsx,ts}'],

  theme: {
    extend: {
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

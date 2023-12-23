const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,ts,md}'],
  theme: {
    extend: {
      textShadow: {
        sm: '1px 1px 0 var(--tw-shadow-color), -1px 1px 0 var(--tw-shadow-color), -1px -1px 0 var(--tw-shadow-color), 1px -1px 0 var(--tw-shadow-color);',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      );
    }),
    require('@tailwindcss/typography'),
  ],
};

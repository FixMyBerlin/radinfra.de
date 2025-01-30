const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/javascript/*.{js,ts}',
  ],
  theme: {
    extend: {
      // Styleguide:
      // Interaction Color: Cyan
      // Highlight Color: Sky
      colors: {
        // Reasign gray to our custom gray color
        gray: colors.stone,
        // Disable other gray tones so we only use `gray`
        // This happens in src/layouts/base.css now
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}

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
      typography: () => ({
        teal: {
          css: {
            '--tw-prose-body': 'var(--color-teal-50)',
            // '--tw-prose-headings': 'var(--color-teal-900)',
            // '--tw-prose-lead': 'var(--color-teal-700)',
            // '--tw-prose-links': 'var(--color-teal-900)',
            // '--tw-prose-bold': 'var(--color-teal-900)',
            // '--tw-prose-counters': 'var(--color-teal-600)',
            // '--tw-prose-bullets': 'var(--color-teal-400)',
            // '--tw-prose-hr': 'var(--color-teal-300)',
            // '--tw-prose-quotes': 'var(--color-teal-900)',
            // '--tw-prose-quote-borders': 'var(--color-teal-300)',
            // '--tw-prose-captions': 'var(--color-teal-700)',
            // '--tw-prose-code': 'var(--color-teal-900)',
            // '--tw-prose-pre-code': 'var(--color-teal-100)',
            // '--tw-prose-pre-bg': 'var(--color-teal-900)',
            // '--tw-prose-th-borders': 'var(--color-teal-300)',
            // '--tw-prose-td-borders': 'var(--color-teal-200)',
            // '--tw-prose-invert-body': 'var(--color-teal-200)',
            // '--tw-prose-invert-headings': 'var(--color-white)',
            // '--tw-prose-invert-lead': 'var(--color-teal-300)',
            // '--tw-prose-invert-links': 'var(--color-white)',
            // '--tw-prose-invert-bold': 'var(--color-white)',
            '--tw-prose-invert-counters': 'var(--color-teal-50)',
            '--tw-prose-invert-bullets': 'var(--color-teal-50)',
            // '--tw-prose-invert-hr': 'var(--color-teal-700)',
            // '--tw-prose-invert-quotes': 'var(--color-teal-100)',
            // '--tw-prose-invert-quote-borders': 'var(--color-teal-700)',
            // '--tw-prose-invert-captions': 'var(--color-teal-400)',
            // '--tw-prose-invert-code': 'var(--color-white)',
            // '--tw-prose-invert-pre-code': 'var(--color-teal-300)',
            // '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': 'var(--color-teal-50)',
            '--tw-prose-invert-td-borders': 'var(--color-teal-950)',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}

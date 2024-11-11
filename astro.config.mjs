import mdx from '@astrojs/mdx'
import netlify from '@astrojs/netlify'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import keystatic from '@keystatic/astro'
import { defineConfig } from 'astro/config'

// ABOUT:
// We have to fetch settings from `.env`
// Which we have to do manually, see https://docs.astro.build/en/guides/configuring-astro/#environment-variables
//
// USAGE:
// `npm run dev` uses hybrid mode and keystatic()
// `npm run build` (server) is based on .env and has different settings for Netlify (CMS/Keystatic) vs. Github Pages (Static site)
// `npm run build:local && npm run serve` overwrites the .env settings to have a local test case for what is on Github Pages
import { loadEnv } from 'vite'
const { ASTRO_OUTPUT_MODE, ASTRO_USE_NETLIFY_ADAPTER } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  '',
)

// CONFIG:
// https://astro.build/config
export default defineConfig({
  // On Netlify and during development we use `hybrid`, on Github Pages we usd `static`.
  // Using static makes sure features like Astros redirecting work as expected.
  // Docs https://docs.astro.build/en/basics/rendering-modes/
  output: ASTRO_OUTPUT_MODE,
  adapter: ASTRO_USE_NETLIFY_ADAPTER === 'true' ? netlify() : undefined,
  integrations: [
    tailwind({
      // https://github.com/withastro/astro/tree/main/packages/integrations/tailwind#applybasestyles
      applyBaseStyles: false,
    }),
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.endsWith('README/'),
    }),
    ASTRO_OUTPUT_MODE === 'hybrid' ? keystatic() : undefined,
  ],
  site: 'https://www.radinfra.de/',
})

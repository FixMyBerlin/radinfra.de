import { languages } from '@layouts/languages'
import { defineCollection, z } from 'astro:content'
import { contentBase } from './postsKeystatic'
import { loader } from './utils/loader'

export const astroPostsDefinition = defineCollection({
  loader: loader(contentBase, 'mdx'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      menuTitle: z.string(),
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val))
        .optional(), // Note: implemented but unused ATM
      author: z.string(),
      inMenu: z.boolean(),
      noindex: z.boolean().optional(),
      language: z.enum(languages).optional(),
      image: image().nullish(),
      imageAlt: z.string().optional(),
      canonicalUrl: z.string().url().optional(),
    }),
})

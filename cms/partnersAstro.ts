import { defineCollection, z } from 'astro:content'
import { contentBase } from './partnersKeystatic'
import { loader } from './utils/loader'
import { partnerCategories } from './utils/partnerCategorySelect'

export const astroPartnersDefinition = defineCollection({
  loader: loader(contentBase, 'mdx'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      startDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      category: z.enum(partnerCategories),
      logo: image().nullish(),
      url: z.string().url().optional(),
    }),
})

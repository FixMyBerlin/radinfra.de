import { defineCollection } from 'astro:content'
import { contentBase } from './campaignsKeystatic'
import { AstroCampaignSchema } from './campaignsSchema'
import { loader } from './utils/loader'

export const astroCampaignsDefinition = defineCollection({
  loader: loader(contentBase, 'json'),
  schema: () => AstroCampaignSchema,
})

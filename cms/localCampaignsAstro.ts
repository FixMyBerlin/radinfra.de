import { defineCollection } from 'astro:content'
import { contentBase } from './localCampaignsKeystatic'
import { AstroLocalCampaignSchema } from './localCampaignsSchema'
import { loader } from './utils/loader'

export const astroLocalCampaignDefinition = defineCollection({
  loader: loader(contentBase, 'json'),
  schema: () => AstroLocalCampaignSchema,
})

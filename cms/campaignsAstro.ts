import { languages } from '@layouts/languages'
import { defineCollection, z } from 'astro:content'
import { contentBase } from './campaignsKeystatic'
import { campaignCategories } from './utils/campaignCategorySelect'
import { loader } from './utils/loader'

export const AstroCampaignSchema = z.object({
  name: z.string(),
  menuTitle: z.string(),
  pubDate: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  category: z.enum(campaignCategories),
  author: z.string(),
  inMenu: z.boolean(),
  language: z.enum(languages).optional(),
  mapUrl: z.string().url().optional(),
  maprouletteChallenge: z.object({
    id: z.number().nullable().optional(),
    enabled: z.boolean(),
    name: z.string(),
    remoteGeoJson: z.string().url(),
    checkinComment: z.string(),
    checkinSource: z.string(),
  }),
  description: z.string(),
  task: z.string(),
})

export type AstroCampaignType = z.infer<typeof AstroCampaignSchema> & { content: string }

export const astroCampaignsDefinition = defineCollection({
  loader: loader(contentBase, 'json'),
  schema: () => AstroCampaignSchema,
})

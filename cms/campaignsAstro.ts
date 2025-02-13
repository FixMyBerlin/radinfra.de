import { languages } from '@layouts/languages'
import { defineCollection, z } from 'astro:content'
import { contentBase } from './campaignsKeystatic'
import { campaignCategories } from './utils/campaignCategorySelect'
import { loader } from './utils/loader'
import { visibilityOptions } from './utils/visibilitySelect'

// REMINDER: Keep in sync with https://github.com/FixMyBerlin/atlas-app/blob/develop/app/src/app/regionen/(index)/_data/radinfraDeCampaignSchema.ts
const AstroCampaignBaseSchema = z.object({
  name: z.string(),
  menuTitle: z.string(),
  pubDate: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  visibility: z.enum(visibilityOptions),
  category: z.enum(campaignCategories),
  author: z.string(),
  language: z.enum(languages).optional(),
  mapUrl: z.string().url().optional(),
  description: z.string(),
  task: z.string(),
})
const AstroCampaignMaprouletteSchema = z.object({
  discriminant: z.literal(true),
  value: z.object({
    id: z.number().nullable().optional(),
    enabled: z.boolean(),
    name: z.string(),
    remoteGeoJson: z.string().url(),
    checkinComment: z.string(),
    checkinSource: z.string(),
    resultsLimited: z.boolean(),
  }),
})
export const AstroCampaignSchema = AstroCampaignBaseSchema.merge(
  z.object({
    maprouletteChallenge: z.union([
      AstroCampaignMaprouletteSchema,
      z.object({
        discriminant: z.literal(false),
      }),
    ]),
  }),
)
export const MaprouletteCampaignCreationSchema = AstroCampaignBaseSchema.merge(
  z.object({ maprouletteChallenge: AstroCampaignMaprouletteSchema }),
)

export const astroCampaignsDefinition = defineCollection({
  loader: loader(contentBase, 'json'),
  schema: () => AstroCampaignSchema,
})

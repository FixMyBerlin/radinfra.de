import { languages } from '@layouts/languages'
import { defineCollection, z } from 'astro:content'
import { contentBase } from './campaignsKeystatic'
import { campaignCategories } from './utils/campaignCategorySelect'
import { loader } from './utils/loader'
import { visibilityOptions } from './utils/visibilitySelect'

// REMINDER: Keep in sync with https://github.com/FixMyBerlin/atlas-app/blob/develop/app/src/app/regionen/(index)/_data/radinfraDeCampaignSchema.ts
export const AstroCampaignSchema = z.object({
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
  maprouletteChallenge: z.union([
    z.object({
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
    }),
    z.object({
      discriminant: z.literal(false),
    }),
  ]),
  description: z.string(),
  task: z.string(),
})

export type AstroCampaignType = z.infer<typeof AstroCampaignSchema> & { content: string }

export const astroCampaignsDefinition = defineCollection({
  loader: loader(contentBase, 'json'),
  schema: () => AstroCampaignSchema,
})

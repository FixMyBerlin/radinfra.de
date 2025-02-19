import { z } from 'astro/zod'
import { campaignCategories } from './utils/campaignCategorySelect'
import { recommendedActions } from './utils/recommendedActionSelect'
import { visibilityOptions } from './utils/visibilitySelect'

const MaprouletteEnabled = z.object({
  enabled: z.literal(true),
  // ID of the MapRoulette Challenge (once created).
  // Added automatically by the script. To add manually, use https://maproulette.org/admin/projects to list all challenges, take the ID from the URL.
  id: z.number().nullable().optional(),
  checkinComment: z.string(),
  checkinSource: z.string(),
  // Results of this campaign are likey cut off
  // There is a limit of 50k tasks for a campaign. Some campaigns have more results and are cut of.
  // The results are ordered by length, shorter ways are cut of first.
  // This field is used to show a notice to users so they know this is likely to happen.
  resultsLimited: z.boolean(),
  // READONLY: Date/Time of the last rebuild
  // This field is managed by the rebuild script.
  rebuildAt: z.string().datetime().nullable().optional(),
})
const MaprouletteDisabled = z.object({ enabled: z.literal(false) })
const CampaignBaseSchema = z.object({
  id: z.string(),
  title: z.string(),
  pubDate: z.string().datetime(),
  visibility: z.enum(visibilityOptions),
  category: z.enum(campaignCategories),
  recommendedAction: z.enum(recommendedActions),
  mapUrl: z.string().url().optional(),
  description: z.string(),
  task: z.string(),
  taskTemplate: z.string(),
  remoteGeoJson: z.string().url(),
  hashtags: z.array(z.string()),
})
const CampaignAddedPropertiesSchmea = z.object({
  id: z.string(),
})

export const AstroAtlasCampaignSchema = CampaignBaseSchema.merge(
  CampaignAddedPropertiesSchmea,
).merge(
  z.object({
    maprouletteChallenge: z.discriminatedUnion('enabled', [
      MaprouletteEnabled,
      MaprouletteDisabled,
    ]),
  }),
)

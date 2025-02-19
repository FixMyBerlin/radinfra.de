import { z } from 'astro/zod'
import { AstroAtlasCampaignSchema } from './remoteCampaignsSchema'

const InputDateTimeTransformSchema = z
  .string()
  .or(z.date())
  .transform((val) => new Date(val))

const HashtagsTransformSchema = z
  .string()
  .transform((val) => (Boolean(val) ? val.split(',').map((s) => s.trim()) : []))

export const AstroLocalCampaignSchema = AstroAtlasCampaignSchema.omit({
  pubDate: true,
  hashtags: true,
  remoteGeoJson: true,
}).merge(
  z.object({
    pubDate: InputDateTimeTransformSchema,
    hashtags: HashtagsTransformSchema,
    remoteGeoJson: z.string().optional().nullable(),
  }),
)

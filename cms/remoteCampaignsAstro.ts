import { defineCollection, z } from 'astro:content'
import { AstroAtlasCampaignSchema } from './remoteCampaignsSchema'

export const astroRemoteCampaignDefinition = defineCollection({
  loader: async () => {
    const remoteRaw = await fetch('https://radverkehrsatlas.de/api/campaigns')
    const data = await remoteRaw.json()
    return z.array(AstroAtlasCampaignSchema).parse(data)
  },
  schema: () => AstroAtlasCampaignSchema,
})

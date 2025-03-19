import { tildaApiUrl } from '@components/fetch/tildaApiUrl.const'
import { defineCollection, z } from 'astro:content'
import { AstroTildaCampaignSchema } from './remoteCampaignsSchema'

export const astroRemoteCampaignDefinition = defineCollection({
  loader: async () => {
    const apiUrl = `${tildaApiUrl}/campaigns`
    const remoteRaw = await fetch(apiUrl)
    const data = await remoteRaw.json()
    const parsed = z.array(AstroTildaCampaignSchema).parse(data)
    if (parsed.length === 0) {
      throw new Error(
        `ERROR: Fetching ${apiUrl} returned an empty array. Check the API and restart the build.`,
      )
    }
    return parsed
  },
  schema: () => AstroTildaCampaignSchema,
})

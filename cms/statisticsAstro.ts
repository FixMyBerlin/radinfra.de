import { tildaStatisticsApiUrl } from '@components/fetch/tildaApiUrl.const'
import { file } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { addProperties } from './statistics/addProperties'
import { ApiStatisticsSchema, AstroStatisticFeaturesSchema } from './statisticsSchema'

export const astroStatisticsDefinition = defineCollection({
  loader: async () => {
    // We try fetching fresh data from Altas. But that did not work every time, so we have a fallback checked in.

    function fallback() {
      const json = file('src/content/statistics/index.json')
      const parsed = ApiStatisticsSchema.parse(json)
      return parsed.features
    }

    const apiUrl = tildaStatisticsApiUrl
    const raw = await fetch(apiUrl)
    if (!raw.ok) {
      console.log('ERROR fetching – using fallback', apiUrl, raw.status, raw.statusText)
      return fallback()
    }

    const json = await raw.json()
    const parsed = ApiStatisticsSchema.parse(json)
    const features = await addProperties(parsed.features)

    if (features.length === 0) {
      console.log('ERROR fetching – using fallback', apiUrl, raw.status, raw.statusText)
      return fallback()
    }

    return features
  },

  schema: () => AstroStatisticFeaturesSchema,
})

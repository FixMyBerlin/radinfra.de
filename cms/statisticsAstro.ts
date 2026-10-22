import { tildaApiTimeoutMs, tildaStatisticsApiUrl } from '@components/fetch/tildaApiUrl.const'
import { z } from 'astro/zod'
import { defineCollection } from 'astro:content'
import { readFile } from 'node:fs/promises'
import { addProperties } from './statistics/addProperties'
import { ApiStatisticsSchema, AstroStatisticFeaturesSchema } from './statisticsSchema'

export const astroStatisticsDefinition = defineCollection({
  loader: async () => {
    // We try fetching fresh data from Altas. But that did not work every time, so we have a fallback checked in.
    // The fallback is written by `scripts/statistic/process.ts` after `addProperties`, so it is already in collection shape.
    // `file()` from 'astro/loaders' returns a Loader object, not data, so we read the JSON with fs.
    async function fallback() {
      const json = JSON.parse(await readFile('src/content/statistics/index.json', 'utf-8'))
      return z.array(AstroStatisticFeaturesSchema).parse(json)
    }

    // Only an unreachable, slow or failing API falls back. Invalid data from a reachable API fails the build
    // below, so schema changes in TILDA get noticed instead of silently shipping the old snapshot.
    const apiUrl = tildaStatisticsApiUrl
    let json: unknown
    try {
      const raw = await fetch(apiUrl, { signal: AbortSignal.timeout(tildaApiTimeoutMs) })
      if (!raw.ok) {
        console.log('ERROR fetching – using fallback', apiUrl, raw.status, raw.statusText)
        return fallback()
      }
      json = await raw.json()
    } catch (error) {
      console.log('ERROR fetching – using fallback', apiUrl, error)
      return fallback()
    }

    const parsed = ApiStatisticsSchema.parse(json)
    if (parsed.features.length === 0) {
      console.log('ERROR fetching – using fallback', apiUrl, 'empty result')
      return fallback()
    }

    return addProperties(parsed.features)
  },

  schema: () => AstroStatisticFeaturesSchema,
})

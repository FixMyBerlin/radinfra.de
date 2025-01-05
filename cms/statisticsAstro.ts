import { file } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { AstroStatisticFeaturesSchema } from './statisticsSchema'

export const astroStatisticsDefinition = defineCollection({
  loader: file('src/content/statistics/index.json'),

  // TODO: Reactivate once the endpoint is cached at radverkehrsatlas
  // See scripts/statistic/README.md for more
  // loader: async () => {
  //   const statisticUrl = `${radverkehrsatlasApiUrl}/stats`
  //   const response = await fetch(statisticUrl)
  //   const data = await response.json()
  //   const parsed = AstroStatisticsSchema.parse(data)
  //   // Must return an array of entries with an id property
  //   // or an object with IDs as keys and entries as values
  //   return parsed.features
  // },
  schema: () => AstroStatisticFeaturesSchema,
})

import { radverkehrsatlasApiUrl } from '@components/fetch/radverkehrsatlasApiUrl.const'
import { defineCollection, z } from 'astro:content'

const position = z.tuple([z.number(), z.number()])
const linearRing = z.array(position)
const polygon = z.array(linearRing)
const multiPolygon = z.object({
  type: z.literal('MultiPolygon'),
  coordinates: z.array(polygon),
})
const AstroStatisticFeaturesSchema = z.object({
  type: z.literal('Feature'),
  id: z.string(),
  properties: z.object({
    id: z.string(),
    name: z.string(),
    level: z.enum(['4', '6']),
    road_length: z.record(z.string(), z.number()),
    bikelane_length: z.record(z.string(), z.number()).nullable(),
    // children: z
    //   .array(
    //     z.object({
    //       id: z.string(),
    //       name: z.string(),
    //     }),
    //   )
    //   .optional(),
  }),
  geometry: multiPolygon,
})
const AstroStatisticsSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(AstroStatisticFeaturesSchema),
})

export const statisticUrl = `${radverkehrsatlasApiUrl}/stats`
export const astroStatisticsDefinition = defineCollection({
  loader: async () => {
    const response = await fetch(statisticUrl)
    const data = await response.json()
    const parsed = AstroStatisticsSchema.parse(data)
    // Must return an array of entries with an id property
    // or an object with IDs as keys and entries as values
    return parsed.features
  },
  schema: () => AstroStatisticFeaturesSchema,
})

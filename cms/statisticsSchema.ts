import { z } from 'astro/zod'

const position = z.tuple([z.number(), z.number()])
const linearRing = z.array(position)
const polygon = z.array(linearRing)
const multiPolygon = z.object({
  type: z.literal('MultiPolygon'),
  coordinates: z.array(polygon),
})
export const AstroStatisticFeaturesSchema = z.object({
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
export const AstroStatisticsSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(AstroStatisticFeaturesSchema),
})

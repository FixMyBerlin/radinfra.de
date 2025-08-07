import { z } from 'astro/zod'

const position = z.tuple([z.number(), z.number()])
const linearRing = z.array(position)
const polygon = z.array(linearRing)
const geometryMultiPolygon = z.object({
  type: z.literal('MultiPolygon'),
  coordinates: z.array(polygon),
})
const geometryPolygon = z.object({
  type: z.literal('Polygon'),
  coordinates: polygon,
})
const properties = z.object({
  id: z.string(),
  name: z.string(),
  level: z.enum(['4', '6']),
  road_length: z
    .object({
      motorway: z.number(),
      motorway_link: z.number(),
      trunk: z.number(),
      trunk_link: z.number(),
      primary: z.number(),
      primary_link: z.number(),
      secondary: z.number(),
      secondary_link: z.number(),
      tertiary: z.number(),
      tertiary_link: z.number(),
      unclassified: z.number(),
      service_road: z.number(),
      service_uncategorized: z.number(),
      service_alley: z.number(),
      residential: z.number(),
      residential_priority_road: z.number(),
      bicycle_road: z.number(),
      living_street: z.number(),
      pedestrian: z.number(),
      unspecified_road: z.number(),
    })
    .partial(),
  bikelane_length: z
    .object({
      crossing: z.number(),
      bicycleRoad: z.number(),
      cyclewayLink: z.number(),
      livingStreet: z.number(),
      cycleway_adjoining: z.number(),
      needsClarification: z.number(),
      sharedMotorVehicleLane: z.number(),
      pedestrianAreaBicycleYes: z.number(),
      sharedBusLaneBikeWithBus: z.number(),
      sharedBusLaneBusWithBike: z.number(),
      cyclewayOnHighway_advisory: z.number(),
      cyclewayOnHighwayProtected: z.number(),
      cyclewayOnHighway_exclusive: z.number(),
      footwayBicycleYes_adjoining: z.number(),
      cyclewayOnHighwayBetweenLanes: z.number(),
      bicycleRoad_vehicleDestination: z.number(),
      footAndCyclewayShared_isolated: z.number(),
      footAndCyclewayShared_adjoining: z.number(),
      footAndCyclewaySegregated_isolated: z.number(),
      footAndCyclewaySegregated_adjoining: z.number(),
      cyclewayOnHighway_advisoryOrExclusive: z.number(),
      footwayBicycleYes_adjoiningOrIsolated: z.number(),
      footAndCyclewayShared_adjoiningOrIsolated: z.number(),
      footAndCyclewaySegregated_adjoiningOrIsolated: z.number(),
      cycleway_adjoiningOrIsolated: z.number(),
      cycleway_isolated: z.number(),
      footwayBicycleYes_isolated: z.number(),
    })
    .partial()
    .nullable(),
})
export const ApiStatisticFeaturesSchema = z.strictObject({
  type: z.literal('Feature'),
  id: z.string(),
  properties: properties,
  geometry: geometryMultiPolygon.or(geometryPolygon),
})
export type ApiStatisticFeatureType = z.infer<typeof ApiStatisticFeaturesSchema>

export const ApiStatisticsSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(ApiStatisticFeaturesSchema),
})

const addedProperties = z.object({
  slug: z.string().optional(), // Only set when a page should be rendered
  levelKey: z.enum(['bund', 'landkreis']),
  parentId: z.string().optional(),
  // hasChildren: z.boolean(),
  // parentName: z.string(),
  updated_at: z.string().datetime(),
  road_sum: z.object({
    sum: z.number(),
    motorway_like: z.number(),
    primary_like: z.number(),
    secondary_like: z.number(),
    residential_like: z.number(),
  }),
  bikelane_sum: z.object({
    sum: z.number(),
    needsClarification: z.number(),
    bike_with_foot_traffic: z.number(),
    bike_with_car_traffic: z.number(),
    bike_next_to_foot_traffic: z.number(),
    bike_next_to_car_traffic: z.number(),
    separate_bike_traffic: z.number(),
  }),
})
export const AstroStatisticFeaturesSchema = ApiStatisticFeaturesSchema.omit({
  properties: true,
}).merge(
  z.strictObject({
    properties: addedProperties.merge(properties),
  }),
)

export type AstroStatisticFeaturesType = z.infer<typeof AstroStatisticFeaturesSchema>

export type RoadCategory = keyof ApiStatisticFeatureType['properties']['road_length']
export type RoadClass = Exclude<keyof z.infer<typeof addedProperties>['road_sum'], 'all'>

export type BikelaneCategories = keyof NonNullable<
  ApiStatisticFeatureType['properties']['bikelane_length']
>
export type BikelaneClass = Exclude<keyof z.infer<typeof addedProperties>['bikelane_sum'], 'all'>

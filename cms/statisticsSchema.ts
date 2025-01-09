import { z } from 'astro/zod'

const position = z.tuple([z.number(), z.number()])
const linearRing = z.array(position)
const polygon = z.array(linearRing)
const multiPolygon = z.object({
  type: z.literal('MultiPolygon'),
  coordinates: z.array(polygon),
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
      protectedCyclewayOnHighway: z.number(),
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
  // children: z
  //   .array(
  //     z.object({
  //       id: z.string(),
  //       name: z.string(),
  //     }),
  //   )
  //   .optional(),
})
export const ApiStatisticFeaturesSchema = z.strictObject({
  type: z.literal('Feature'),
  id: z.string(),
  properties: properties,
  geometry: multiPolygon,
})
export type ApiStatisticFeatureType = z.infer<typeof ApiStatisticFeaturesSchema>
export const ApiStatisticsSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(ApiStatisticFeaturesSchema),
})
const addedProperties = z.object({
  road_sum: z.object({
    all: z.number(),
    motorway: z.number(),
    primary: z.number(),
    secondary: z.number(),
    residential: z.number(),
  }),
  bikelane_sum: z.object({
    all: z.number(),
    needsClarification: z.number(),
    bike_with_foot_traffic: z.number(),
    bike_with_car_traffic: z.number(),
    bike_next_to_foot_traffic: z.number(),
    bike_next_to_car_traffic: z.number(),
    separate_bike_traffic: z.number(),
  }),
})
export const AstroStatisticFeaturesSchema = z.strictObject({
  type: z.literal('Feature'),
  id: z.string(),
  properties: properties.merge(addedProperties),
  geometry: multiPolygon,
})

export type RoadCategory = keyof ApiStatisticFeatureType['properties']['road_length']
export type RoadClass = Exclude<keyof z.infer<typeof addedProperties>['road_sum'], 'all'>

export type BikelaneCategories = keyof NonNullable<
  ApiStatisticFeatureType['properties']['bikelane_length']
>
export type BikelaneClass = Exclude<keyof z.infer<typeof addedProperties>['bikelane_sum'], 'all'>
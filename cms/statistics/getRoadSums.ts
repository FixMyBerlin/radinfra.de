import type { ApiStatisticFeatureType, RoadCategory, RoadClass } from 'cms/statisticsSchema'
import { sum } from './sum'

const highwayClassDefintion: Record<RoadCategory, RoadClass> = {
  motorway: 'motorway_like',
  motorway_link: 'motorway_like',

  trunk: 'primary_like',
  trunk_link: 'primary_like',
  primary: 'primary_like',
  primary_link: 'primary_like',
  secondary: 'primary_like',
  secondary_link: 'primary_like',
  tertiary: 'primary_like',
  tertiary_link: 'primary_like',

  unclassified: 'secondary_like',
  service_road: 'secondary_like',
  service_uncategorized: 'secondary_like',
  service_alley: 'secondary_like',

  residential: 'residential_like',
  residential_priority_road: 'residential_like',
  bicycle_road: 'residential_like',
  living_street: 'residential_like',
  pedestrian: 'residential_like',
  unspecified_road: 'residential_like',
}

const values = (
  input: ApiStatisticFeatureType['properties']['road_length'],
  roadClass: RoadClass,
) => {
  return Object.entries(input)
    .map(([highwayTag, value]) => {
      return highwayClassDefintion[highwayTag as RoadCategory] === roadClass ? value : undefined
    })
    .filter(Boolean)
}

export const getRoadSums = (road_length: ApiStatisticFeatureType['properties']['road_length']) => {
  return {
    sum: sum(Object.values(road_length).filter(Boolean)),
    motorway_like: sum(values(road_length, 'motorway_like')), // AB Autobahn
    primary_like: sum(values(road_length, 'primary_like')), // HSV Hauptverkehrsstraßen
    secondary_like: sum(values(road_length, 'secondary_like')), // NVS Nebenstraßen
    residential_like: sum(values(road_length, 'residential_like')), // WS Wohnstraßen
  } satisfies Record<RoadClass, number>
}

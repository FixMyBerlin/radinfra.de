import type { ApiStatisticFeatureType, RoadCategory, RoadClass } from 'cms/statisticsSchema'
import { sum } from './sum'

const highwayClassDefintion: Record<RoadCategory, RoadClass> = {
  motorway: 'motorway',
  motorway_link: 'motorway',

  trunk: 'primary',
  trunk_link: 'primary',
  primary: 'primary',
  primary_link: 'primary',
  secondary: 'primary',
  secondary_link: 'primary',
  tertiary: 'primary',
  tertiary_link: 'primary',

  unclassified: 'secondary',
  service_road: 'secondary',
  service_uncategorized: 'secondary',
  service_alley: 'secondary',

  residential: 'residential',
  residential_priority_road: 'residential',
  bicycle_road: 'residential',
  living_street: 'residential',
  pedestrian: 'residential',
  unspecified_road: 'residential',
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

export const roadSums = (road_length: ApiStatisticFeatureType['properties']['road_length']) => {
  return {
    sum: sum(Object.values(road_length).filter(Boolean)),
    motorway: sum(values(road_length, 'motorway')), // AB Autobahn
    primary: sum(values(road_length, 'primary')), // HSV Hauptverkehrsstraßen
    secondary: sum(values(road_length, 'secondary')), // NVS Nebenstraßen
    residential: sum(values(road_length, 'residential')), // WS Wohnstraßen
  }
}

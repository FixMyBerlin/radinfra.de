import type {
  ApiStatisticFeatureType,
  BikelaneCategories,
  BikelaneClass,
} from 'cms/statisticsSchema'
import { sum } from './sum'

const bikelaneClasses = new Map<BikelaneClass, BikelaneCategories[]>([
  [
    //
    'needsClarification',
    ['needsClarification'],
  ],
  [
    // 'Gehweg Rad frei',
    'bike_with_foot_traffic',
    [
      'footwayBicycleYes_isolated',
      'pedestrianAreaBicycleYes',
      'footwayBicycleYes_adjoining',
      'footwayBicycleYes_adjoiningOrIsolated',
    ],
  ],
  [
    // 'Fuehrung mit Kfz-explizit',
    'bike_with_car_traffic',
    [
      'sharedMotorVehicleLane',
      'bicycleRoad_vehicleDestination',
      'sharedBusLaneBusWithBike',
      'sharedBusLaneBikeWithBus',
    ],
  ],
  [
    // 'Fuehrung mit Fussverkehr',
    'bike_next_to_foot_traffic',
    [
      'footAndCyclewayShared_isolated',
      'footAndCyclewayShared_adjoining',
      'footAndCyclewayShared_adjoiningOrIsolated',
    ],
  ],
  [
    // 'Fuehrung eigenstaendig auf Fahrbahn',
    'bike_next_to_car_traffic',
    [
      'cyclewayOnHighway_exclusive',
      'cyclewayOnHighwayBetweenLanes',
      'cyclewayLink',
      'crossing',
      'cyclewayOnHighway_advisory',
      'cyclewayOnHighway_advisoryOrExclusive',
    ],
  ],
  [
    // 'fuehrung baul. abgesetzt von Kfz',
    'separate_bike_traffic',
    [
      'footAndCyclewaySegregated_adjoining',
      'footAndCyclewaySegregated_adjoiningOrIsolated',
      'cycleway_isolated',
      'cycleway_adjoining',
      'bicycleRoad',
      'footAndCyclewaySegregated_isolated',
      'cycleway_adjoiningOrIsolated',
      'cyclewayOnHighwayProtected',
    ],
  ],
])

const values = (
  input: ApiStatisticFeatureType['properties']['bikelane_length'],
  bikelaneClass: BikelaneClass,
) => {
  return Object.entries(input || {})
    .map(([highwayTag, value]) => {
      const categories = bikelaneClasses.get(bikelaneClass) ?? []
      return categories.includes(highwayTag) ? value : undefined
    })
    .filter(Boolean)
}

export const getBikelaneSums = (
  bikelane_length: ApiStatisticFeatureType['properties']['bikelane_length'],
) => {
  return {
    sum: sum(Object.values(bikelane_length || {}).filter(Boolean)),
    needsClarification: sum(values(bikelane_length, 'needsClarification')),
    bike_with_foot_traffic: sum(values(bikelane_length, 'bike_with_foot_traffic')),
    bike_with_car_traffic: sum(values(bikelane_length, 'bike_with_car_traffic')),
    bike_next_to_foot_traffic: sum(values(bikelane_length, 'bike_next_to_foot_traffic')),
    bike_next_to_car_traffic: sum(values(bikelane_length, 'bike_next_to_car_traffic')),
    separate_bike_traffic: sum(values(bikelane_length, 'separate_bike_traffic')),
  }
}

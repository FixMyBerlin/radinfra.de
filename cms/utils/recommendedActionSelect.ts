export const recommendedActions = ['maproulette', 'map', 'streetcomplete', 'mapillary'] as const

export const recommendedActionSelect = [
  { label: 'TILDA Radverkehr-MapRoulette', value: 'maproulette' },
  { label: 'TILDA Radverkehr-Karte', value: 'map' },
  { label: 'StreetComplete', value: 'streetcomplete' },
  { label: 'Mapillary', value: 'mapillary' },
] as const satisfies Array<{ label: string; value: (typeof recommendedActions)[number] }>

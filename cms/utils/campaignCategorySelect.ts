export const campaignCategories = [
  'radinfra',
  'currentness',
  'traffic_signs',
  'surface',
  'width',
  'mapillary',
] as const

// This is also the order in which campaigns are displayed on the /kampagnen page
export const campaignCategorySelect = [
  { label: 'Radinfrastruktur', value: 'radinfra' },
  { label: 'Aktualität', value: 'currentness' },
  { label: 'Verkehrszeichen', value: 'traffic_signs' },
  { label: 'Oberfläche', value: 'surface' },
  { label: 'Breite', value: 'width' },
  { label: 'Straßenfotos/Mapillary', value: 'mapillary' },
] as const satisfies Array<{ label: string; value: (typeof campaignCategories)[number] }>

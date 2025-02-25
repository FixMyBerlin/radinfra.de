export const partnerCategories = ['core', 'finance', 'media-community'] as const

// This is also the order in which results are displayed
export const partnerCategorySelect = [
  { label: 'Partner', value: 'core' },
  { label: 'Supporter', value: 'finance' },
  { label: 'Netzwerk- und Communitypartner', value: 'media-community' },
] as const satisfies Array<{ label: string; value: (typeof partnerCategories)[number] }>

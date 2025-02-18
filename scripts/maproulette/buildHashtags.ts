export const buildHashtags = (slug: string, category: string, ...rest: string[]) => {
  return [
    '#radinfra_de',
    `#${slug}`,
    // The other categories are less relevant
    category == 'traffic_signs' ? `#${category}` : undefined,
    ...rest,
  ]
    .flat()
    .filter(Boolean)
}

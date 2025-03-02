export const statisticLandkreisPath = (slug: string | undefined) => {
  if (!slug) return null
  return `/statistik/bundesland/${slug}`
}

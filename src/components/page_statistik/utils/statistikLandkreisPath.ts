import { slugify } from '@components/utils/slugify'
import { bundeslandLandkreis } from '../bundLandkreisHelper/bundeslandLandkreis.const'

export const statisticLandkreisPath = (slug: string) => {
  return `/statistik/bundesland/${slug}`
}

export const getStatisticLandkreisPath = (relationId: string | undefined, name: string) => {
  const landkreisOsmIds = relationId ? bundeslandLandkreis.get(relationId) : undefined
  if (!landkreisOsmIds || landkreisOsmIds?.length === 0) return null
  return statisticLandkreisPath(slugify(name))
}

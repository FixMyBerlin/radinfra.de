import { getCollection } from 'astro:content'
import type { AstroStatisticFeaturesType } from 'cms/statisticsSchema'

export type CardProps = {
  levelKey: AstroStatisticFeaturesType['properties']['levelKey']
  bundeslandId?: string | undefined
}

export const getStatistics = async ({ levelKey, bundeslandId }: CardProps) => {
  const unfilteredStatistics = await getCollection('statistics')

  const statistics = unfilteredStatistics
    .filter((stat) => stat.data.properties.levelKey === levelKey)
    .filter((stat) => (bundeslandId ? stat.data.properties.parentId === bundeslandId : true))
    .sort((a, b) => a.data.properties.name.localeCompare(b.data.properties.name))

  return statistics
}

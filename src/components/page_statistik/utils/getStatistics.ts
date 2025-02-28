import { getCollection } from 'astro:content'
import { bundeslandLandkreis } from '../bundLandkreisHelper/bundeslandLandkreis.const'
import { levelMap, type Level } from '../bundLandkreisHelper/level'

export type CardProps = { level: Level; bundeslandId?: string | undefined }

export const getStatistics = async ({ level, bundeslandId }: CardProps) => {
  const landkreisOsmIds = bundeslandId ? bundeslandLandkreis.get(bundeslandId) : []
  const unfilteredStatistics = await getCollection('statistics')

  const statistics = unfilteredStatistics
    .filter((stat) => stat.data.properties.level === levelMap.get(level))
    .filter((stat) => (bundeslandId ? landkreisOsmIds?.includes(stat.data.id) : true))
    .sort((a, b) => a.data.properties.name.localeCompare(b.data.properties.name))

  return statistics
}

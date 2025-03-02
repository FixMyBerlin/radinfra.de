import { slugify } from '@components/utils/slugify'
import type { ApiStatisticFeatureType, AstroStatisticFeaturesType } from 'cms/statisticsSchema'
import { bundeslandLandkreis } from './bundeslandLandkreis.const'
import { getBikelaneSums } from './getBikelaneSums'
import { getBundeslandByLandkreis } from './getBundeslandByLandkreis'
import { getRoadSums } from './getRoadSums'

export const addProperties = (features: ApiStatisticFeatureType[]) => {
  return features.map((feature) => {
    const parentId = getBundeslandByLandkreis(feature.id)
    const hasChildren = !!bundeslandLandkreis.get(feature.id)?.length
    // const landkreis = features.find((f) => f.id === parentId)

    const enhancedFeature: AstroStatisticFeaturesType = {
      ...feature,
      properties: {
        ...feature.properties,
        slug: hasChildren ? slugify(feature.properties.name) : undefined,
        levelKey: feature.properties.level === '4' ? 'bund' : 'landkreis',
        hasChildren,
        parentId,
        // parentName:
        //   feature.properties.level === '4'
        //     ? 'Deutschland'
        //     : `Landkreis ${landkreis?.properties.name}`,
        updated_at: new Date().toISOString(),
        road_sum: getRoadSums(feature.properties.road_length),
        bikelane_sum: getBikelaneSums(feature.properties.bikelane_length),
      },
    }

    return enhancedFeature
  })
}

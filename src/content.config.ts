import { astroCampaignsDefinition } from 'cms/campaignsAstro'
import { astroPostsDefinition } from 'cms/postsAstro'
import { astroStatisticsDefinition } from 'cms/statisticsAstro'

export const collections = {
  posts: astroPostsDefinition,
  campaigns: astroCampaignsDefinition,
  statistics: astroStatisticsDefinition,
}

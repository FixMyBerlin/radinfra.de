import { astroCampaignsDefinition } from 'cms/campaignsAstro'
import { astroPartnersDefinition } from 'cms/partnersAstro'
import { astroPostsDefinition } from 'cms/postsAstro'
import { astroStatisticsDefinition } from 'cms/statisticsAstro'

export const collections = {
  posts: astroPostsDefinition,
  campaigns: astroCampaignsDefinition,
  statistics: astroStatisticsDefinition,
  partners: astroPartnersDefinition,
}

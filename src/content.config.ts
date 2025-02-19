import { astroLocalCampaignDefinition } from 'cms/localCampaignsAstro'
import { astroPartnersDefinition } from 'cms/partnersAstro'
import { astroPostsDefinition } from 'cms/postsAstro'
import { astroRemoteCampaignDefinition } from 'cms/remoteCampaignsAstro'
import { astroStatisticsDefinition } from 'cms/statisticsAstro'

export const collections = {
  posts: astroPostsDefinition,
  localCampaigns: astroLocalCampaignDefinition,
  remoteCampaigns: astroRemoteCampaignDefinition,
  statistics: astroStatisticsDefinition,
  partners: astroPartnersDefinition,
}

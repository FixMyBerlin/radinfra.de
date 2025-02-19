import { config } from '@keystatic/core'
import { KEYSTATIC_STORAGE_KIND } from 'astro:env/client'
import { keystaticlocalCampaignsConfig } from 'cms/localCampaignsKeystatic'
import { keystaticPartnersConfig } from 'cms/partnersKeystatic'
import { keystaticPostsConfig } from 'cms/postsKeystatic'

export default config({
  storage: {
    // https://keystatic.com/docs/github-mode#setting-up-git-hub-mode
    kind: KEYSTATIC_STORAGE_KIND,
    repo: {
      owner: 'FixMyBerlin',
      name: 'radinfra.de',
    },
  },
  ui: {
    brand: {
      name: 'radinfra.de',
      // mark: () => <img src="/logo.png" height={27} />,
    },
    navigation: {
      Blog: ['posts'],
      Kampagnen: ['campaigns'],
      Partner: ['partners'],
    },
  },
  collections: {
    posts: keystaticPostsConfig,
    campaigns: keystaticlocalCampaignsConfig,
    partners: keystaticPartnersConfig,
  },
  singletons: {},
})

import { config } from '@keystatic/core'
import { keystaticCampaignsConfig } from 'keystatic/keystatic.campaigns.config'
import { keystaticPostsConfig } from 'keystatic/keystatic.posts.config'

export default config({
  storage: {
    // https://keystatic.com/docs/github-mode#setting-up-git-hub-mode
    kind: import.meta.env.PUBLIC_ASTRO_STORAGE_KIND,
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
    },
  },
  collections: {
    posts: keystaticPostsConfig,
    campaigns: keystaticCampaignsConfig,
  },
  singletons: {},
})

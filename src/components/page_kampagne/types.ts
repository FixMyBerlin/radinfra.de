import { getCollection } from 'astro:content'

const allCampaigns = await getCollection('campaigns')
export type Campaign = (typeof allCampaigns)[number]

import { getCollection } from 'astro:content'

const localCampaigns = await getCollection('localCampaigns')
const remoteCampaigns = await getCollection('remoteCampaigns')
export type Campaign = (typeof localCampaigns)[number] | (typeof remoteCampaigns)[number]

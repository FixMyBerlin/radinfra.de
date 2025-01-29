import { getCollection } from 'astro:content'
export const prerender = true

// Docs https://docs.astro.build/en/guides/endpoints/
// export async function GET({ params, request }) {

export async function GET() {
  const allCampaigns = await getCollection('campaigns')
  const sortedCampaigns = allCampaigns
    .filter((c) => c.data.maprouletteChallenge.id)
    .toSorted((postA, postB) => {
      return new Date(postB.data.pubDate).valueOf() - new Date(postA.data.pubDate).valueOf()
    })

  const data = sortedCampaigns.map(({ id, data }) => {
    return { id, ...data }
  })

  return new Response(JSON.stringify(data))
}

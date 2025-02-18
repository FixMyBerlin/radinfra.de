import { getCollection } from 'astro:content'
import { buildHashtags } from 'scripts/maproulette/buildHashtags'
export const prerender = true

// Docs https://docs.astro.build/en/guides/endpoints/
// export async function GET({ params, request }) {

export async function GET() {
  const allCampaigns = await getCollection('campaigns')
  const sortedCampaigns = allCampaigns
    // .filter((c) => c.data.maprouletteChallenge.id)
    .toSorted((c1, c2) => {
      return c1.id.localeCompare(c2.id)
    })

  const data = sortedCampaigns.map(({ id, data }) => {
    return { id, ...data, hashtags: buildHashtags(id, data.category) }
  })

  return new Response(JSON.stringify(data))
}

import { getCollection } from 'astro:content'
export const prerender = true

// Docs https://docs.astro.build/en/guides/endpoints/
// export async function GET({ params, request }) {

export async function GET() {
  const allCampaigns = await getCollection('campaigns')
  const sortedCampaigns = allCampaigns
    // .filter((c) => c.data.maprouletteChallenge.id)
    .toSorted((c1, c2) => {
      return c1.data.name.localeCompare(c2.data.name)
    })

  const data = sortedCampaigns.map(({ id, data }) => {
    return { id, ...data }
  })

  return new Response(JSON.stringify(data))
}

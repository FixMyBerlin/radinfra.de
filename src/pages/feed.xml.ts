import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', (post) => new Date(post.data.pubDate) <= new Date())

  return rss({
    title: 'radinfra.de – Radinfrastruktur Deutschland',
    description: 'Radinfrastrukturdaten aus OpenStreetMap für Deutschland',
    site: context.site!,
    items: posts.map((post) => ({
      ...post.data,
      link: `posts/${post.id}/`,
      customData: `<language>${post.data.language || 'de'}</language>`,
    })),
  })
}

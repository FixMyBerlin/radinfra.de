import rss from '@astrojs/rss'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'

export async function GET(context: APIContext) {
  const posts = await getCollection('posts')

  return rss({
    title: 'Radinfrastruktur Deutschland',
    description: 'Radinfrastrukturdaten aus OpenStreetMap für Deutschland',
    site: context.site!,
    items: posts.map((post) => ({
      ...post.data,
      link: `posts/${post.slug}/`,
      customData: `<language>${post.data.language || 'de'}</language>`,
    })),
  })
}

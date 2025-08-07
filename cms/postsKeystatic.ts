import { collection, fields } from '@keystatic/core'
import { mdxComponentsKeystatic } from './components/mdxComponentsKeystatic'
import { authorsSelect } from './utils/authorsSelect'
import { languagesSelect } from './utils/languagesSelect'

export const contentBase = 'src/content/posts'
export const keystaticPostsConfig = collection({
  label: 'Blog',
  slugField: 'menuTitle',
  path: `${contentBase}/*`,
  format: { contentField: 'content' },
  entryLayout: 'content',
  columns: ['title', 'pubDate'],
  schema: {
    title: fields.text({ label: 'Title', validation: { isRequired: true } }),
    menuTitle: fields.slug({ name: { label: 'Menu title', validation: { isRequired: true } } }),
    pubDate: fields.datetime({ label: 'Publish Date/Time UTC', validation: { isRequired: true }, description: 'Reminder: Zeitzone zurückrechnen.' }),
    updatedDatae: fields.datetime({ label: 'Date/Time UTC of last relevant update' }),
    author: fields.select({
      label: 'Author',
      options: authorsSelect,
      defaultValue: authorsSelect.at(0)!.value,
    }),
    inMenu: fields.checkbox({ label: 'Show in Menu', defaultValue: true }),
    noindex: fields.checkbox({ label: 'Noindex for Google', defaultValue: false }),
    language: fields.select({
      label: 'Language',
      options: languagesSelect,
      defaultValue: languagesSelect.at(0)!.value,
    }),
    content: fields.mdx({
      label: 'Content',
      components: mdxComponentsKeystatic('posts'),
      // Astro does not allow to configure max image sizes for Content components.
      // Instead we rely on our custom image components.
      options: { image: false },
    }),
    image: fields.image({
      label: 'Social Sharing Image Path',
      description: 'Bild bitte im Format 1200x630px hochladen.',
      directory: `src/content/posts`,
      publicPath: `/src/content/posts`,
    }),
    imageAlt: fields.text({ label: 'Social Sharin Image Alt Text' }),
    canonicalUrl: fields.url({ label: 'Canonical URL', validation: { isRequired: false } }),
  },
})

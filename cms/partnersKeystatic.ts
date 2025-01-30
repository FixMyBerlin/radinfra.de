import { collection, fields } from '@keystatic/core'
import { mdxComponentsKeystatic } from './components/mdxComponentsKeystatic'

export const contentBase = 'src/content/partners'
export const keystaticPartnersConfig = collection({
  label: 'Partners',
  slugField: 'title',
  path: `${contentBase}/*/`,
  format: { contentField: 'content' },
  entryLayout: 'form',
  columns: ['title'],
  schema: {
    title: fields.slug({ name: { label: 'Title', validation: { isRequired: true } } }),
    startDate: fields.date({ label: 'Publish Date', validation: { isRequired: true } }),
    contactName: fields.text({ label: 'Author', validation: { isRequired: false } }),
    content: fields.mdx({
      label: 'Content',
      components: mdxComponentsKeystatic,
    }),
    logo: fields.image({
      label: 'Logo',
      description: 'Bild bitte im Format 560x560px hochladen.',
    }),
    url: fields.url({ label: 'Website URL', validation: { isRequired: false } }),
  },
})

import { collection, fields } from '@keystatic/core'
import { mdxComponentsKeystatic } from './components/mdxComponentsKeystatic'
import { partnerCategorySelect } from './utils/partnerCategorySelect'

export const contentBase = 'src/content/partners'
export const keystaticPartnersConfig = collection({
  label: 'Partners',
  slugField: 'title',
  path: `${contentBase}/*/`,
  format: { contentField: 'content' },
  entryLayout: 'form',
  columns: ['title', 'category', 'startDate'],
  schema: {
    title: fields.slug({ name: { label: 'Title', validation: { isRequired: true } } }),
    startDate: fields.date({
      label: 'Publish Date',
      description: 'Das Datum wird auch für die Reihenfolge der Eintrage in den Listen verwendet.',
      validation: { isRequired: true },
    }),
    category: fields.select({
      label: 'Kategorie',
      options: partnerCategorySelect,
      defaultValue: partnerCategorySelect.at(0)!.value,
    }),
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

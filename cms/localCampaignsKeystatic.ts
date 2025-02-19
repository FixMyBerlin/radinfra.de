import { collection, fields } from '@keystatic/core'
import { campaignCategorySelect } from './utils/campaignCategorySelect'
import { recommendedActionSelect } from './utils/recommendedActionSelect'
import { visibilitySelect } from './utils/visibilitySelect'

export const contentBase = 'src/content/localCampaigns'
export const keystaticlocalCampaignsConfig = collection({
  label: 'Lokale Kampagne',
  slugField: 'title',
  path: `${contentBase}/*/`,
  format: { data: 'json' },
  entryLayout: 'form',
  columns: ['title', 'category', 'visibility'],
  schema: {
    title: fields.slug({ name: { label: 'Menu title', validation: { isRequired: true } } }),
    pubDate: fields.datetime({ label: 'Publish Date/Time', validation: { isRequired: true } }),
    category: fields.select({
      label: 'Category',
      options: campaignCategorySelect,
      defaultValue: campaignCategorySelect.at(0)!.value,
    }),
    recommendedAction: fields.select({
      label: 'Recommended action',
      description: 'The UI of the campaign page will change based on this.',
      options: recommendedActionSelect,
      defaultValue: recommendedActionSelect.at(0)!.value,
    }),
    visibility: fields.select({
      label: 'Visibility',
      options: visibilitySelect,
      defaultValue: visibilitySelect.at(0)!.value,
    }),
    description: fields.mdx.inline({
      label: 'Description',
      components: {}, // disallow Image components due to custom, simplistic markdown pipeline
      options: { image: false },
    }),
    task: fields.mdx.inline({
      label: 'Task',
      components: {}, // disallow Image components due to custom, simplistic markdown pipeline
      options: { image: false },
    }),
    mapUrl: fields.url({ label: 'Radverkehrsatlas URL', validation: { isRequired: false } }),
    maprouletteChallenge: fields.object(
      {
        enabled: fields.checkbox({ label: 'Always off' }),
      },
      { label: 'Default values' },
    ),
    taskTemplate: fields.text({ label: 'Always empty' }),
    hashtags: fields.text({ label: 'Always empty' }),
  },
})

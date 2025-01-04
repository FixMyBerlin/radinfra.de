import { collection, fields } from '@keystatic/core'
import { mdxComponentsKeystatic } from './components/mdxComponentsKeystatic'
import { authorsSelect } from './utils/authorsSelect'
import { campaignCategorySelect } from './utils/campaignCategorySelect'
import { languagesSelect } from './utils/languagesSelect'

export const contentBase = 'src/content/campaigns'
export const keystaticCampaignsConfig = collection({
  label: 'Kampagne',
  slugField: 'menuTitle',
  path: `${contentBase}/*/`,
  format: { data: 'json' },
  entryLayout: 'form',
  columns: ['name', 'pubDate', 'category'],
  schema: {
    name: fields.text({ label: 'Title', validation: { isRequired: true } }),
    menuTitle: fields.slug({ name: { label: 'Menu title', validation: { isRequired: true } } }),
    pubDate: fields.datetime({ label: 'Publish Date/Time', validation: { isRequired: true } }),
    category: fields.select({
      label: 'Category',
      options: campaignCategorySelect,
      defaultValue: campaignCategorySelect.at(0)!.value,
    }),
    author: fields.select({
      label: 'Author',
      options: authorsSelect,
      defaultValue: authorsSelect.at(0)!.value,
    }),
    inMenu: fields.checkbox({ label: 'Show in Menu', defaultValue: true }),
    language: fields.select({
      label: 'Language',
      options: languagesSelect,
      defaultValue: languagesSelect.at(0)!.value,
    }),
    content: fields.mdx.inline({
      label: 'Content',
      components: mdxComponentsKeystatic,
    }),
    maprouletteChallenge: fields.object(
      {
        id: fields.number({
          label: 'ID of the MapRoulette Challenge (once created)',
          description:
            'User https://maproulette.org/admin/projects to list all challenges, take the ID from the URL.',
          validation: { isRequired: false },
        }),
        enabled: fields.checkbox({
          label: 'Challenge enabled in MapRoulette (and noindex if disabled)',
          defaultValue: true,
        }),
        name: fields.text({
          label: 'Titel/Name',
          validation: { isRequired: true },
        }),
        remoteGeoJson: fields.url({
          label: 'Remote GeoJSON URL',
          validation: { isRequired: true },
        }),
        checkinComment: fields.text({
          label: 'Changeset Default Comment',
          validation: { isRequired: true },
        }),
        checkinSource: fields.text({
          label: 'Changeset Source',
          validation: { isRequired: true },
        }),
      },
      {
        label: 'MapRoulette',
        description: 'Settings related to creating and updating the MapRoulette challenge.',
      },
    ),
  },
})

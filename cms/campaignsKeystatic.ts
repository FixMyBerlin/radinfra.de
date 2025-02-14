import { collection, fields } from '@keystatic/core'
import { authorsSelect } from './utils/authorsSelect'
import { campaignCategorySelect } from './utils/campaignCategorySelect'
import { languagesSelect } from './utils/languagesSelect'
import { visibilitySelect } from './utils/visibilitySelect'

export const contentBase = 'src/content/campaigns'
export const keystaticCampaignsConfig = collection({
  label: 'Kampagne',
  slugField: 'menuTitle',
  path: `${contentBase}/*/`,
  format: { data: 'json' },
  entryLayout: 'form',
  columns: ['name', 'category', 'visibility'],
  schema: {
    name: fields.text({ label: 'Title', validation: { isRequired: true } }),
    menuTitle: fields.slug({ name: { label: 'Menu title', validation: { isRequired: true } } }),
    pubDate: fields.datetime({ label: 'Publish Date/Time', validation: { isRequired: true } }),
    category: fields.select({
      label: 'Category',
      options: campaignCategorySelect,
      defaultValue: campaignCategorySelect.at(0)!.value,
    }),
    visibility: fields.select({
      label: 'Visibility',
      options: visibilitySelect,
      defaultValue: visibilitySelect.at(0)!.value,
    }),
    author: fields.select({
      label: 'Author',
      options: authorsSelect,
      defaultValue: authorsSelect.at(0)!.value,
    }),
    language: fields.select({
      label: 'Language',
      options: languagesSelect,
      defaultValue: languagesSelect.at(0)!.value,
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
    maprouletteChallenge: fields.conditional(
      fields.checkbox({ label: 'Enable MapRoulette', defaultValue: false }),
      {
        true: fields.object(
          {
            id: fields.number({
              label: 'ID of the MapRoulette Challenge (once created)',
              description:
                'Added automatically by the script. To add manually, use https://maproulette.org/admin/projects to list all challenges, take the ID from the URL.',
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
            resultsLimited: fields.checkbox({
              label: 'Results of this campaign are likey cut off',
              description: `
                There is a limit of 50k tasks for a campaign. Some campaigns have more results and are cut of.
                The results are ordered by length, shorter ways are cut of first.
                This field is used to show a notice to users so they know this is likely to happen.
              `,
              defaultValue: false,
            }),
            rebuildAt: fields.datetime({
              label: 'READONLY: Date/Time of the last rebuild',
              description: 'This field is managed by the rebuild script.',
              validation: { isRequired: false },
            }),
          },
          {
            label: 'MapRoulette',
            description: 'Settings related to creating and updating the MapRoulette challenge.',
          },
        ),
        false: fields.empty(),
      },
    ),
  },
})

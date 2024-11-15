import { collection, fields } from '@keystatic/core'
import { languages } from '@layouts/languages'
import { defineCollection, z } from 'astro:content'
import { mdxComponentsKeystatic } from './mdxComponents'
import { authorsSelect } from './utils/authorsSelect'
import { languagesSelect } from './utils/languagesSelect'

export const AstroCampaignSchema = z.object({
  name: z.string(),
  menuTitle: z.string(),
  // project: z.enum(extractedProjectKeys),
  pubDate: z
    .string()
    .or(z.date())
    .transform((val) => new Date(val)),
  author: z.string(),
  inMenu: z.boolean(),
  language: z.enum(languages).optional(),
  maprouletteChallenge: z.object({
    id: z.number().nullable(),
    enabled: z.boolean(),
    name: z.string(),
    remoteGeoJson: z.string().url(),
    checkinComment: z.string(),
    checkinSource: z.string(),
  }),
})

export type AstroCampaignType = z.infer<typeof AstroCampaignSchema> & { content: string }

export const astroCampaignsDefinition = defineCollection({
  type: 'data',
  schema: () => AstroCampaignSchema,
})

export const keystaticCampaignsConfig = collection({
  label: 'Kampagne',
  slugField: 'menuTitle',
  path: 'src/content/campaigns/*/',
  format: { data: 'json' },
  entryLayout: 'form',
  columns: ['name', 'pubDate'],
  schema: {
    name: fields.text({ label: 'Title', validation: { isRequired: true } }),
    menuTitle: fields.slug({ name: { label: 'Menu title', validation: { isRequired: true } } }),
    // project: fields.select({
    //   label: 'Project',
    //   options: projectsSelect,
    //   defaultValue: projectsSelect.at(0)!.value,
    // }),
    pubDate: fields.datetime({ label: 'Publish Date/Time', validation: { isRequired: true } }),
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

import { fields } from '@keystatic/core'
import { block } from '@keystatic/core/content-components'

export const keystaticDownloadButtonConfig = (imagePath: string) =>
  block({
    label: 'Download Button',
    schema: {
      label: fields.text({ label: 'Label', validation: { isRequired: true } }),
      file: fields.file({
        label: 'Datei',
        validation: { isRequired: true },
        // This will output the files in the "public" directory
        // Which means they are not finger printed.
        // See https://github.com/Thinkmill/keystatic/discussions/1369 for more.
        directory: `public/downloads/${imagePath}`,
        publicPath: `/downloads/${imagePath}/`,
      }),
      filename: fields.text({
        label: 'Dateiname der Datei beim Download',
        validation: { isRequired: false },
      }),
    },
    ContentView: (props) => {
      return props.value.label
    },
  })

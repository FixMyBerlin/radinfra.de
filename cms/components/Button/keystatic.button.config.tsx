import { fields } from '@keystatic/core'
import { block } from '@keystatic/core/content-components'

export const keystaticButtonConfig = block({
  label: 'Button',
  schema: {
    label: fields.text({ label: 'Label', validation: { isRequired: true } }),
    href: fields.url({ label: 'URL', validation: { isRequired: true } }),
  },
  ContentView: (props) => {
    return (
      <a href={props.value.href!} target="_blank">
        {props.value.label} ({props.value.href})
      </a>
    )
  },
})

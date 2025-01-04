import { clsx } from 'clsx'
import { micromark } from 'micromark'

type Props = { markdown: string | undefined; className?: string }

export const Markdown = ({ markdown, className }: Props) => {
  if (!markdown) return null

  return (
    <div
      dangerouslySetInnerHTML={{ __html: micromark(markdown) }}
      className={clsx(
        'prose prose-headings:font-serif prose-headings:text-base prose-headings:font-bold',
        className,
      )}
    />
  )
}

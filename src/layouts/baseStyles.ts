import { twJoin } from 'tailwind-merge'

export const proseBase = twJoin(
  'prose prose-cyan',
  // <ul>
  '[--tw-prose-bullets:_gray]',
  // <code>
  'prose-code:rounded prose-code:bg-gray-100 prose-code:box-decoration-clone prose-code:px-1.5 prose-code:py-1 prose-code:text-gray-800 prose-code:before:content-none prose-code:after:content-none',
  // <blockquote>
  'prose-blockquote:bg-gray-100 prose-blockquote:p-4 prose-blockquote:pb-2',
  // .lead
  'prose-lead:text-sky-800',
  // <a>
  'prose-a:decoration-cyan-300 prose-a:decoration-1 prose-a:underline-offset-4',
)

export const proseHeadings = twJoin(
  // <h#> anchor position
  'prose-headings:scroll-mt-10',
  // <h1>
  'prose-h1:mb-3 prose-h1:mt-16 prose-h1:text-sky-700 first:prose-h1:mt-0',
  // <h2>
  'prose-h2:mb-4 prose-h2:mt-16',
  // <h3>
  'prose-h3:mb-4 prose-h3:mt-8',
)

import { twJoin } from 'tailwind-merge'

export const proseBase = twJoin(
  // REMIDNER: Also check tailwind.config.cjs for overwrites
  'prose prose-teal prose-invert font-serif',
  // <ul>
  // '[--tw-prose-bullets:_white]', // does not work, using tailwind.config.cjs overwrites instead
  // <code>
  'prose-code:rounded-sm prose-code:bg-teal-800/90 prose-code:box-decoration-clone prose-code:px-1.5 prose-code:py-1 prose-code:text-teal-50 prose-code:before:content-none prose-code:after:content-none',
  // <blockquote>
  'prose-blockquote:bg-teal-100 prose-blockquote:p-4 prose-blockquote:pb-2',
  // .lead
  'prose-lead:text-teal-50 prose-lead:font-serif',
  // <a>
  'prose-a:text-teal-200 prose-a:decoration-teal-300 prose-a:hover:decoration-teal-50 prose-a:hover:text-teal-100 prose-a:decoration-1 prose-a:underline-offset-4',
  // <hr>
  'prose-hr:border-teal-100',
  // Headings
  'prose-headings:font-sans',
)

export const proseHeadings = twJoin(
  'prose-headings:font-sans',
  // <h#> anchor position
  'prose-headings:scroll-mt-10',
  // <h1>
  'prose-h1:mb-3 prose-h1:mt-16 prose-h1:text-teal-50 first:prose-h1:mt-0',
  // <h2>
  'prose-h2:mb-4 prose-h2:mt-16',
  // <h3>
  'prose-h3:mb-4 prose-h3:mt-8',
)

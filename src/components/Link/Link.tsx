import { twJoin, twMerge } from 'tailwind-merge'

const baseStyles = twJoin('')
export const linkStyles = twJoin(
  baseStyles,
  'text-teal-200 decoration-teal-300 decoration-1 underline-offset-4 hover:text-teal-100 hover:decoration-teal-50',
)

export const buttonStyles = twJoin(
  baseStyles,
  'not-prose my-2 inline-block rounded-sm border border-teal-100 px-2.5 py-1.5 text-teal-200 hover:bg-teal-100/70 hover:text-black hover:no-underline',
)

type Props = {
  to: string
  className?: string
  /** @default `false` */
  blank?: boolean
  /** @desc Style Link as Button */
  button?: boolean
  children: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const Link = ({ to, className, children, blank = false, button, ...props }: Props) => {
  return (
    <a
      href={to}
      className={twMerge(button ? buttonStyles : linkStyles, className)}
      {...{ target: blank ? '_blank' : undefined }}
      {...props}
    >
      {children}
    </a>
  )
}

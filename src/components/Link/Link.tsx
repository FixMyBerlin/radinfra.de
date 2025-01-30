import { twJoin, twMerge } from 'tailwind-merge'

const baseStyles = twJoin('text-cyan-600')
export const linkStyles = twJoin(
  baseStyles,
  'underline-cyan-700 underline decoration-cyan-300 decoration-1 underline-offset-4',
)
export const buttonStyles = twJoin(baseStyles, 'rounded-full border border-cyan-600 px-6 pt-4 pb-3')

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

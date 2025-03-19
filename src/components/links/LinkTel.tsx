import { twMerge } from 'tailwind-merge'
import { buttonStyles, linkStyles } from './Link'

type Props = {
  tel: string
  className?: string
  /** @desc Style Link as Button */
  button?: boolean
  children?: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const TelLink = ({ className, tel, button, children, ...props }: Props) => {
  return (
    <a
      href={`tel:${tel}`}
      className={twMerge(button ? buttonStyles : linkStyles, className)}
      {...props}
    >
      {children || tel}
    </a>
  )
}

import { ReactNode } from "react"
import { WithItemSize } from "../../shared/interfaces"

export interface ButtonBaseProps extends WithItemSize {
  type?: 'primary' | 'secondary' | 'transparent' | 'slient'
  block?: boolean
  loading?: boolean
  success?: boolean
  error?: boolean
  disabled?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  divided?: boolean
  children?: ReactNode
  onClick?: ()=>any
}


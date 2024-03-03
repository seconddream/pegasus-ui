import clsx from 'clsx'
import { ReactNode, useRef } from 'react'
import { WithId, WithSizing } from '../../shared/interfaces'
import { Sizing } from '@/pegasus-ui/shared/styles'
import { AiOutlineCheckCircle, AiOutlineExclamationCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'

export type ButtonType = 'primary' | 'secondary' | 'transparent'

const ButtonTheme = {
  primary: {
    bg: 'bg-primary-700',
    bgHover: 'hover:bg-primary-600',
    bgActive: 'active:bg-primary-800',
    text: 'text-white',
  },
  secondary: {
    bg: 'bg-white',
    bgHover: 'hover:bg-primary-100',
    bgActive: 'active:bg-primary-200',
    text: 'text-primary-700',
    border: `border border-dark-line`,
  },
  transparent: {
    bg: 'bg-transparent',
    bgHover: 'hover:bg-primary-300/50',
    bgActive: 'active:bg-primary-300',
    text: 'text-primary-700',
  },
  disabled: {
    bg: 'bg-disabled',
    text: 'text-white',
  },
  success: {
    bg: 'bg-success-500',
    text: 'text-white',
  },
  error: {
    bg: 'bg-warning-500',
    bgHover: 'hover:bg-warning-400',
    bgActive: 'active:bg-warning-500',
    text: 'text-white',
  },
  danger: {
    bg: 'bg-danger-500',
    bgHover: 'hover:bg-danger-400',
    bgActive: 'active:bg-danger-600',
    text: 'text-white',
  },
}

export interface ButtonBaseProps extends WithId {
  type?: ButtonType
  size?: 'lg' | 'md' | 'sm' | 'xs'
  shape?: 'rounded' | 'circle'
  block?: boolean
  loading?: boolean
  success?: boolean
  error?: boolean
  disabled?: boolean
  danger?: boolean
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  divided?: boolean
  focusable?: boolean
  children?: ReactNode
  onClick?: () => any
}

export default function ButtonBase(props: ButtonBaseProps) {
  const {
    id,
    type = 'secondary',
    size = 'md',
    shape = 'rounded',
    block = false,
    loading = false,
    success = false,
    error = false,
    disabled = false,
    danger = false,
    icon,
    iconPosition = 'left',
    focusable = false,
    onClick,
    children,
  } = props

  const circle = shape === 'circle'
  const normalState = !loading && !success && !error && !disabled
  const shouldInteract = !loading && !success && !disabled
  const shouldOverWriteIcon = loading || success || error
  const { squireSize, height, paddingX, gap, fontSize, iconSize, corner } = Sizing[size]

  const buttonRef = useRef<HTMLDivElement>(null)

  return (
    <div
      id={id}
      ref={buttonRef}
      tabIndex={focusable && shouldInteract ? 0 : undefined}
      className={clsx(
        // basic
        'flex flex-shrink-0 font-medium whitespace-nowrap justify-center items-center transition-all ease-out',
        // sizing
        circle || !children ? squireSize : [height, paddingX],
        block && !circle && !children && 'w-full',
        circle ? 'rounded-full' : corner,
        fontSize,
        gap,
        // color
        normalState && danger && [...Object.values(ButtonTheme.danger)],
        normalState && !danger && [...Object.values(ButtonTheme[type])],
        !normalState && loading && [...Object.values(ButtonTheme.disabled)],
        !normalState && success && [...Object.values(ButtonTheme.success)],
        !normalState && error && [...Object.values(ButtonTheme.error)],
        !normalState && disabled && [...Object.values(ButtonTheme.disabled)],
        // shadow
        type !== 'transparent' && 'shadow-sm',
        // interaction
        shouldInteract
          ? 'hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-highlight'
          : 'hover:cursor-not-allowed'
      )}
      onMouseDown={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!shouldInteract) {
          return
        }
        buttonRef.current?.classList.add('animate-signal')
        buttonRef.current?.addEventListener('animationend', () => {
          buttonRef.current?.classList.remove('animate-signal')
        })
        buttonRef.current?.blur()
        onClick?.()
      }}
      onKeyDown={(e) => {
        if (focusable && e.key === 'Enter' && shouldInteract) {
          buttonRef.current?.blur()
          onClick?.()
        }
      }}
    >
      {iconPosition === 'right' && children}
      {(shouldOverWriteIcon || icon) && (
        <span className={clsx(iconSize, { 'animate-spin': loading })}>
          {loading && <AiOutlineLoading3Quarters />}
          {success && <AiOutlineCheckCircle />}
          {error && <AiOutlineExclamationCircle />}
          {!shouldOverWriteIcon && icon ? icon : null}
        </span>
      )}
      {iconPosition === 'left' && children}
    </div>
  )
}

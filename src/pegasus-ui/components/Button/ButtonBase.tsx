import clsx from 'clsx'
import { ReactNode, useRef } from 'react'
import { WithId, WithSizing } from '../../shared/interfaces'
import { FocusRingStyle, Sizing } from '@/pegasus-ui/shared/styles'
import { AiOutlineCheckCircle, AiOutlineExclamationCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'

export type ButtonType = 'primary' | 'secondary' | 'transparent' | 'slient'

const ButtonTheme = {
  primary: {
    bgColor: 'bg-slate-700',
    bgColorHover: 'hover:bg-indigo-400',
    textColor: 'text-white',
    textColorHover: 'hover:text-white',
  },
  secondary: {
    bgColor: 'bg-slate-200',
    bgColorHover: 'hover:bg-indigo-400',
    textColor: 'text-slate-700',
    textColorHover: 'hover:text-white',
  },
  transparent: {
    bgColor: 'bg-transparent',
    bgColorHover: 'hover:bg-indigo-400',
    textColor: 'text-slate-700',
    textColorHover: 'hover:text-white',
  },
  slient: {
    textColor: 'text-slate-700',
    textColorHover: 'hover:text-indigo-400',
    textColorActive: 'active:text-slate-700',
  },
  loading: {
    bgColor: 'bg-slate-300',
    textColor: 'text-white',
  },
  disabled: {
    bgColor: 'bg-slate-300',
    textColor: 'text-white',
  },
  success: {
    bgColor: 'bg-green-500',
    textColor: 'text-white',
  },
  error: {
    bgColor: 'bg-amber-500',
    bgColorHover: 'hover:bg-amber-400',
    textColor: 'text-white',
  },
  danger: {
    bgColor: 'bg-red-500',
    bgColorHover: 'hover:bg-red-400',
    textColor: 'text-white',
  },
}

export interface ButtonBaseProps extends WithId, WithSizing {
  type?: ButtonType
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
        'flex flex-shrink-0 whitespace-nowrap justify-center items-center transition-all ease-out',
        // sizing
        circle ? squireSize : [height, paddingX],
        block ? 'w-full' : 'w-fit',
        corner,
        fontSize,
        gap,
        // color
        normalState && danger && [...Object.values(ButtonTheme.danger)],
        normalState && !danger && [...Object.values(ButtonTheme[type])],
        !normalState && loading && [...Object.values(ButtonTheme.loading)],
        !normalState && success && [...Object.values(ButtonTheme.success)],
        !normalState && error && [...Object.values(ButtonTheme.error)],
        !normalState && disabled && [...Object.values(ButtonTheme.disabled)],
        // interaction
        shouldInteract
          ? [
              'hover:cursor-pointer',
              type !== 'slient' && 'hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg active:shadow-none',
              'focus:border-none focus:outline-none focus:ring-2',
              FocusRingStyle,
            ]
          : ['hover:cursor-not-allowed']
      )}
      onMouseDown={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick?.()
      }}
      onKeyDown={(e) => {
        if (focusable && e.key === 'Enter') {
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

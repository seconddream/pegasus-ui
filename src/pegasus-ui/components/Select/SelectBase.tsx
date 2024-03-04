import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { WithFormControl, WithId, WithPlacement, WithSizing } from '../../shared/interfaces'
import { Sizing, Spacing } from '../../shared/styles'
import clsx from 'clsx'
import { AiOutlineDown, AiOutlineLeft } from 'react-icons/ai'
import Label from '../Label'
import useReveal from '../../hooks/useReveal'
import { Popover } from 'antd'
import PopOver from '../PopOver'

export type SelectOption = { label: string; value: any }

export interface SelectBaseProps extends WithId, WithSizing, WithPlacement, WithFormControl {
  icon?: ReactNode
  options: SelectOption[]
  sufix?: string
  input?: boolean
  onInputChange?: () => any
  multiple?: boolean
  onDeselect?: () => any
  children: ReactNode
}

export default function SelectBase(props: SelectBaseProps) {
  const {
    id,
    size = 'md',
    width = 'w-full',
    value,
    error,
    disabled,
    icon,
    options,
    position = 'bottomRight',
    sufix,
    input,
    onInputChange,
    multiple = false,
    onDeselect,
    children,
  } = props

  const { fontSize, gap, height, paddingX, paddingY, corner, iconSize } = Sizing[size]
  const shouldInteract = !disabled

  const displayValue = useMemo(() => {
    if (multiple) {
      return options
        .filter((o) => value.includes(o.value))
        .map((o, index) => {
          return <Label key={index} color='gray' bordered text={o.label} />
        })
    } else {
      if (options) {
        return options.filter((o) => o.value === value)[0]?.label
      } else {
        return value
      }
    }
  }, [value, options])

  const [open, setOpen] = useState(false)

  const baseRef = useRef<HTMLDivElement>(null)

  const handleClose = (e: any) => {
    if (baseRef.current && !baseRef.current.contains(e.target)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClose)
    return () => {
      document.removeEventListener('mousedown', handleClose)
    }
  }, [])

  return (
    <div id={id} className={clsx(width)}>
      <PopOver el={children} show={open} animation='slide-down' position={position} block >
        <div
          ref={baseRef}
          tabIndex={shouldInteract ? 0 : undefined}
          className={clsx(
            'flex items-center justify-start border shadow-sm',
            disabled ? 'bg-disabled text-deemphasized-content' : 'bg-white hover:cursor-pointer',
            fontSize,
            gap,
            multiple ? [paddingY, 'flex-wrap'] : height,
            corner,
            error ? 'border-error' : 'border-dark-line',
            paddingX,
            'focus:outline-none focus:ring-2 focus:ring-highlight'
          )}
          onClick={() => {
            setOpen(!open)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && shouldInteract) {
              setOpen(true)
            }
            if (e.key === 'Escape' && shouldInteract) {
              setOpen(false)
            }
          }}
        >
          <div className={clsx('flex flex-grow flex-wrap whitespace-nowrap', Spacing.gap.tight)}>{displayValue}</div>
          <div className={clsx(iconSize, 'text-deemphasized-content hover:text-content', 'transition-all ease-out')}>
            {icon ? icon : <AiOutlineLeft className={clsx(open ? '-rotate-90' : 'rotate-0',  ' transition-all ease-out')} />}
          </div>
        </div>
      </PopOver>
    </div>
  )
}

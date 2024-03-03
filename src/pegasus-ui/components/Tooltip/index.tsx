import { ReactNode, useCallback, useMemo, useState } from 'react'
import { WithPlacement } from '../../shared/interfaces'
import PopOver from '../PopOver'
import Label from '../Label'

export interface TooltipProps extends WithPlacement {
  text: string
  children?: ReactNode
}

export default function Tooltips(props: TooltipProps) {
  const { text, position = 'top', children } = props
  const [show, SetShow] = useState(false)

  const animation = useMemo(() => {
    switch (position) {
      case 'top':
      case 'topLeft':
      case 'topRight':
        return 'centered-slide-up'
      case 'bottom':
      case 'bottomLeft':
      case 'bottomRight':
        return 'centered-slide-down'
      default:
        return 'fade-in'
    }
  }, [position])

  return (
    <div
      onMouseEnter={() => {
        SetShow(true)
      }}
      onMouseLeave={() => {
        SetShow(false)
      }}
    >
      <PopOver
        show={show}
        el={<Label text={text} color='white' shadow />}
        position={position}
        animation={animation}
      >
        {children}
      </PopOver>
    </div>
  )
}

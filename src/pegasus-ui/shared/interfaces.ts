export interface WithId {
  id?: string
}

export type Sizing = 'lg' | 'md' | 'sm'
export interface WithSizing {
  size?: Sizing
}
export function parseSizing(size: Sizing) {
  return {
    lg: size === 'lg',
    md: size === 'md',
    sm: size === 'sm',
  }
}

export type Spacing = 'relaxed' | 'normal' | 'tight'
export interface WithSpacing {
  space?: Spacing
}
export function parseSpacing(space: Spacing){
  return {
    relaxed: space === 'relaxed',
    normal: space === 'normal',
    tight: space === 'tight',
  }
}

export type Direction = 'horizontal' | 'vertical'
export interface WithDirection {
  direction?: Direction
}
export function parseDirection(direction: Direction) {
  return {
    horizontal: direction === 'horizontal',
    vertical: direction === 'vertical',
  }
}

export type Placement = 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
export interface WithPlacement {
  position?: Placement
}
export function parsePlacement(position: Placement) {
  const top = position === 'top'
  const bottom = position === 'bottom'
  const left = position === 'left'
  const right = position === 'right'
  const topLeft = position === 'topLeft'
  const topRight = position === 'topRight'
  const bottomLeft = position === 'bottomLeft'
  const bottomRight = position === 'bottomRight'
  return {
    top,
    bottom,
    left,
    right,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
  }
}

export interface WithFormControl {
  value?: any
  error?: any
  disabled?: boolean
  readOnly?: boolean
  onChange?: (value:any)=>any
}


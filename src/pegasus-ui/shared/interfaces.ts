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
  space: Spacing
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
export function parseLayoutDirection(direction: Direction) {
  return {
    horizontal: direction === 'horizontal',
    isVerticverticalal: direction === 'vertical',
  }
}

export interface WithId {
  id?: string
}
export interface WithItemSize {
  size?: 'lg' | 'md' | 'sm'
}

export type LayoutDirection = 'horizontal' | 'vertical'
export interface WithLayoutDirection {
  direction?: LayoutDirection
}
export function parseLayoutDirection(direction: LayoutDirection){
  return {
    isHorizontal: direction === 'horizontal',
    isVertical: direction === 'vertical'
  }
}
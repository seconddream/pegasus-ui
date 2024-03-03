import clsx from 'clsx'
import { WithDirection, parseDirection } from '../../shared/interfaces'

export interface DividerProps extends WithDirection {}

export default function Divider(props: DividerProps) {
  const { direction = 'vertical' } = props
  const { vertical } = parseDirection(direction)
  return <span className={clsx(vertical ? 'h-2/3 w-[1px]' : 'w-full h-[1px]', ' bg-dark-line')}>&nbsp;</span>
}

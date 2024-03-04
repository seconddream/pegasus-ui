import clsx from 'clsx'
import { WithFormControl, WithId, WithPlacement, WithSizing } from '../../shared/interfaces'
import SelectBase, { SelectBaseProps, SelectOption } from './SelectBase'
import { Sizing, Spacing } from '../../shared/styles'

export interface DropdownProps extends WithId, WithSizing, WithPlacement, WithFormControl {
  options: SelectOption[]
  multiple?: boolean
}

export default function Dropdown(props: DropdownProps) {
  const {
    id,
    size = 'md',
    position = 'bottomRight',
    value,
    error = false,
    onChange,
    disabled = false,
    options,
    multiple = false,
  } = props
  const { fontSize, iconSize, gap, corner, paddingX, height } = Sizing[size]
  return (
    <SelectBase
      id={id}
      size={size}
      position={position}
      value={value}
      error={error}
      disabled={disabled}
      options={options}
      multiple={multiple}
    >
      <div
        className={clsx(
          'flex flex-col divide-y divide-light-line overflow-hidden border border-dark-line bg-white shadow-xl',
          corner
        )}
      >
        {options.map((option, index) => {
          return (
            <div
              onMouseDown={(e)=>{
                e.stopPropagation()
                e.preventDefault()
              }}
              onClick={(e)=>{
                e.stopPropagation()
                e.preventDefault()
              }}
              key={index}
              className={clsx(
                'flex items-center justify-start hover:cursor-pointer transition-all ease-out whitespace-nowrap',
                fontSize,
                iconSize,
                Spacing.gap.tight,
                paddingX,
                height,
                // corner,
                'bg-white text-content hover:bg-primary hover:text-white'
              )}
            >
              {multiple && <input type='checkbox' />}{option.label}
            </div>
          )
        })}
      </div>
    </SelectBase>
  )
}

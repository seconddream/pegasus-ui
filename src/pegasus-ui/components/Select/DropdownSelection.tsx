import clsx from 'clsx'
import {
  WithFormControl,
  WithId,
  WithPlacement,
  WithSizing,
} from '../../shared/interfaces'
import SelectBase, { SelectBaseProps, SelectOption } from './SelectBase'
import { Sizing, Spacing } from '../../shared/styles'
import { useState } from 'react'

export interface DropdownProps
  extends WithId,
    WithSizing,
    WithPlacement,
    WithFormControl {
  options: SelectOption[]
  multiple?: boolean
}

export default function Dropdown(props: DropdownProps) {
  const {
    id,
    size = 'md',
    position = 'bottomRight',
    width = 'w-full',
    value,
    error = false,
    onChange,
    disabled = false,
    options,
    multiple = false,
  } = props

  const { fontSize, iconSize, gap, corner, paddingX, height } = Sizing[size]

  const isControlled = value !== undefined
  const initValue = isControlled ? value : multiple ? [] : null
  const [_value, _setValue] = useState<any | any[]>(initValue)

  const mergedValue = isControlled ? value : _value

  const handleValueUpdate = (value: any) => {
    const newValue = multiple
      ? Array.from(new Set([...mergedValue, value]))
      : value
    if (isControlled) {
      onChange?.(newValue)
    } else {
      _setValue(newValue)
    }
  }
  const removeValue = (value: any) => {
    const newValue = mergedValue.filter((v: any) => v !== value)
    if (isControlled) {
      onChange?.(newValue)
    } else {
      _setValue(newValue)
    }
  }

  return (
    <SelectBase
      id={id}
      size={size}
      position={position}
      width={width}
      value={mergedValue}
      error={error}
      disabled={disabled}
      options={options}
      multiple={multiple}
      onDeselect={multiple ? removeValue : undefined}
    >
      <div
        className={clsx(
          'flex flex-col divide-y divide-light-line border border-dark-line bg-white shadow-xl max-h-48 overflow-y-scroll',
          corner,
          
        )}
        onClick={(e)=>{
          if(multiple){
            e.preventDefault()
            e.stopPropagation()
          }
        }}
      >
        {options.map((option, index) => {
          const optionSelected = multiple
            ? mergedValue.includes(option.value)
            : false
          return (
            <div
              onClick={(e) => {
                handleValueUpdate(option.value)
              }}
              key={index}
              className={clsx(
                'flex flex-shrink-0 items-center justify-start hover:cursor-pointer transition-all ease-out whitespace-nowrap',
                fontSize,
                iconSize,
                Spacing.gap.tight,
                paddingX,
                height,
                // corner,
                'bg-white text-content hover:bg-primary hover:text-white'
              )}
            >
              {multiple && (
                <input
                  className={clsx('hover:cursor-pointer ignorePopOverClose')}
                  type='checkbox'
                  checked={optionSelected}
                  onMouseDown={(e)=>{
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onChange={(e) => {
                    if (!e.target.checked) {
                      removeValue(option.value)
                    }else{
                      handleValueUpdate(option.value)
                    }
                  }}
                />
              )}
              {option.label}
            </div>
          )
        })}
      </div>
    </SelectBase>
  )
}

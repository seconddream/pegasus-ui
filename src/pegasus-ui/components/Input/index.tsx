import { useState } from 'react'
import { WithFormControl, WithId, WithSizing } from '../../shared/interfaces'
import { FormItemDefaultWidth, Sizing } from '../../shared/styles'
import Label from '../Label'
import { AiOutlineCloseCircle, AiOutlineCopy, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import clsx from 'clsx'

export interface InputProps extends WithId, WithSizing, WithFormControl {
  type?: 'number' | 'password' | 'text' | 'textarea'
  width?: string
  prefix?: string
  suffix?: string
  placeHolder?: string
  maxLength?: number
  rows?: number
  showClear?: boolean
  showCopy?: boolean
  allowShowPassword?: boolean

  onEnterPress?: () => any
}

export default function Input(props: InputProps) {
  const {
    id,
    type = 'text',
    width = FormItemDefaultWidth,
    size = 'md',
    prefix,
    suffix,
    placeHolder,
    maxLength,
    rows = 3,
    value,
    error,
    disabled = false,
    readOnly = false,
    showClear = true,
    showCopy = false,
    allowShowPassword = true,
    onChange,
    onEnterPress,
  } = props

  const isControlled = value !== undefined
  const initValue = isControlled ? (value === null ? '' : value) : ''

  const [_value, _setValue] = useState(initValue)
  const [focus, setFocus] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleValueUpdate = (value: any) => {
    if (isControlled) {
      if (type === 'number') {
        let parsed = parseFloat(value)
        if (!isNaN(parsed)) {
          onChange?.(parsed)
        }
      } else {
        onChange?.(value)
      }
    } else {
      _setValue(value)
    }
  }

  const { fontSize, gap, height, paddingX, paddingY, corner } = Sizing[size]

  return (
    <div
      id={id}
      className={clsx(
        'flex border justify-start items-center shadow-sm',
        disabled ? 'bg-disabled' : 'bg-white',
        width,
        fontSize,
        gap,
        type === 'textarea' ? paddingY : height,
        corner,
        error ? 'border-error' : 'border-dark-line',
        paddingX,
        focus && 'ring-2 ring-highlight'
      )}
    >
      {prefix && <span className={clsx(error ? 'text-error' : 'text-deemphasized-content')}>{prefix}</span>}
      {type !== 'textarea' && (
        <input
          disabled={disabled}
          className={clsx('border-none outline-none w-full', disabled && 'bg-disabled text-disabled-content')}
          type={type === 'password' ? (showPassword ? 'text' : type) : type}
          value={isControlled ? initValue : _value}
          maxLength={maxLength}
          placeholder={placeHolder}
          readOnly={readOnly}
          onFocus={() => {
            setFocus(true)
          }}
          onBlur={() => {
            setFocus(false)
          }}
          onChange={(e) => {
            handleValueUpdate(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEnterPress?.()
            }
          }}
        />
      )}
      {type === 'textarea' && (
        <textarea
          disabled={disabled}
          className={clsx('border-none outline-none w-full', disabled && 'bg-disabled text-disabled-content')}
          value={isControlled ? initValue : _value}
          maxLength={maxLength}
          placeholder={placeHolder}
          readOnly={readOnly}
          rows={rows}
          onFocus={() => {
            setFocus(true)
          }}
          onBlur={() => {
            setFocus(false)
          }}
          onChange={(e) => {
            handleValueUpdate(e.target.value)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onEnterPress?.()
            }
          }}
        />
      )}
      {suffix && <Label color={error ? 'red' : 'gray'} text={suffix} />}
      {(type === 'text' || type === 'textarea') && (showClear || showCopy) && (
        <span
          className={clsx(
            'flex items-center',
            type === 'textarea' && 'flex-col',
            error ? 'text-error' : 'text-deemphasized-content',
            gap,
            fontSize
          )}
        >
          {showCopy && (
            <AiOutlineCopy
              className='hover:text-content hover:cursor-pointer'
              onClick={() => {
                navigator.clipboard.writeText(isControlled ? value : _value)
              }}
            />
          )}
          {showClear && !disabled && (
            <AiOutlineCloseCircle
              className='hover:text-content hover:cursor-pointer'
              onClick={() => {
                handleValueUpdate('')
              }}
            />
          )}
        </span>
      )}
      {type === 'password' && allowShowPassword && (
        <span
          className={clsx(
            'flex items-center',
            error ? 'text-error' : 'text-deemphasized-content',
            gap,
            fontSize
          )}
        >
          {showPassword && (
            <AiOutlineEyeInvisible
              className='hover:text-content hover:cursor-pointer'
              onClick={() => {
                setShowPassword(false)
              }}
            />
          )}
          {!showPassword && (
            <AiOutlineEye
              className='hover:text-content hover:cursor-pointer'
              onClick={() => {
                setShowPassword(true)
                setTimeout(() => {
                  setShowPassword(false)
                }, 5000)
              }}
            />
          )}
        </span>
      )}
    </div>
  )
}

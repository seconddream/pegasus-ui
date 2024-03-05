import dayjs from 'dayjs'
import 'dayjs/locale/de'
import { WithFormControl, WithId, Withlocale, WithPlacement, WithSizing } from '../../shared/interfaces'
import { useState } from 'react'
import SelectBase from './SelectBase'
import CalendarBase from '../Calendar/CalendarBase'
import { Sizing, Spacing } from '../../shared/styles'
import clsx from 'clsx'
import { Button } from '../Button'
import { AiOutlineFieldTime, AiOutlineHistory, AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai'
import Input from '../Input'
import Divider from '../Divider'

export interface DateTimeSelectionProps extends WithId, WithSizing, WithPlacement, WithFormControl, Withlocale {
  showTime?: boolean
}

export default function DateTimeSelection(props: DateTimeSelectionProps) {
  const {
    id,
    size = 'md',
    position = 'bottomRight',
    width = 'w-full',
    locale = 'en',
    value,
    error = false,
    onChange,
    disabled = false,
    showTime = true,
  } = props

  const { fontSize, iconSize, gap, corner, paddingX, height } = Sizing[size]

  const isControlled = value !== undefined
  const initValue = isControlled ? value : dayjs().unix()
  const [_value, _setValue] = useState(initValue)
  const mergedValue = isControlled ? value : _value

  const handleValueUpdate = (value: number) => {
    if (isControlled) {
      onChange?.(value)
    } else {
      _setValue(value)
    }
  }

  const udpateTime = (updates: { unit: any; value: any }[]) => {
    let newTime = dayjs.unix(mergedValue)
    for (const { unit, value } of updates) {
      newTime = newTime.set(unit, value)
    }
    handleValueUpdate(newTime.unix())
  }

  const displayValue = dayjs.unix(mergedValue).locale(locale).format('YYYY-MMM-DD hh:mm:ss')

  const [view, setView] = useState<'year' | 'month' | 'week'>('week')

  const zoomIn = () => {
    switch (view) {
      case 'year':
        setView('month')
        break
      case 'month':
        setView('week')
        break
      default:
        break
    }
  }
  const zoomOut = () => {
    switch (view) {
      case 'week':
        setView('month')
        break
      case 'month':
        setView('year')
        break
      default:
        break
    }
  }

  return (
    <SelectBase
      id={id}
      size={size}
      position={position}
      width={width}
      value={displayValue}
      error={error}
      disabled={disabled}
    >
      <div
        className={clsx(
          Spacing.padding.normal,
          'bg-white border border-dark-line shadow-xl flex flex-col',
          fontSize,
          iconSize,
          corner,
          Spacing.gap.tight
        )}
        onClick={(e)=>{
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <div className={clsx('flex justify-between')}>
          <div className={clsx('flex justify-start items-center text-content font-bold', Spacing.gap.extratight)}>
            <span>{dayjs.unix(mergedValue).year()}</span>
            {(view === 'week' || view === 'month') && (
              <span>{dayjs.unix(mergedValue).locale(locale).format('MMM')}</span>
            )}
            {view === 'week' && <span>{dayjs.unix(mergedValue).locale(locale).format('DD')}</span>}
          </div>
          <div className={clsx('flex justify-start items-center text-content font-bold', Spacing.gap.extratight)}>
            <Button
              type='transparent'
              size='sm'
              icon={<AiOutlineHistory />}
              onClick={() => {
                const now = dayjs()
                udpateTime([
                  { unit: 'year', value: now.year() },
                  { unit: 'month', value: now.month() },
                  { unit: 'date', value: now.date() },
                  { unit: 'hour', value: now.hour() },
                  { unit: 'minute', value: now.minute() },
                  { unit: 'second', value: now.second() },
                ])
              }}
            />
            <Button
              type='transparent'
              size='sm'
              disabled={view === 'week'}
              icon={<AiOutlineZoomIn />}
              onClick={zoomIn}
            />
            <Button
              type='transparent'
              size='sm'
              disabled={view === 'year'}
              icon={<AiOutlineZoomOut />}
              onClick={zoomOut}
            />
          </div>
        </div>
        <CalendarBase
          anchorTime={mergedValue}
          locale={locale}
          view={view}
          titleRenderer={(title, index, view) => {
            switch (view) {
              case 'week':
                return (
                  <div
                    key={index}
                    className={clsx('flex w-8 h-7 justify-center items-center font-semibold text-content')}
                  >
                    {title}
                  </div>
                )
              default:
                return null
            }
          }}
          cellRenderer={(cell, index, view) => {
            switch (view) {
              case 'week':
                const isWeekend = index % 7 === 5 || index % 7 === 6
                const isSelected = dayjs.unix(mergedValue).startOf('day').unix() === cell.start
                return (
                  <div
                    key={index}
                    className={clsx(
                      'flex w-8 h-8 justify-center items-center rounded-full',
                      (cell.outside || isWeekend) && 'text-dark-line',
                      cell.current && 'font-bold text-ellipsis',
                      isSelected && 'bg-highlight text-white',
                      'hover:bg-primary-hover hover:text-white hover:cursor-pointer'
                    )}
                    onClick={() => {
                      const updateTime = dayjs.unix(cell.start)
                      udpateTime([
                        { unit: 'month', value: updateTime.month() },
                        { unit: 'date', value: updateTime.date() },
                      ])
                    }}
                  >
                    {cell.name}
                  </div>
                )
              case 'year':
                return (
                  <div
                    key={index}
                    className={clsx(
                      'flex w-full h-8 justify-center items-center',
                      corner,
                      cell.current && 'font-bold text-ellipsis',
                      'hover:bg-primary-hover hover:text-white hover:cursor-pointer'
                    )}
                    onClick={() => {
                      const updateTime = dayjs.unix(cell.start)
                      udpateTime([{ unit: 'year', value: updateTime.year() }])
                      zoomIn()
                    }}
                  >
                    {cell.name}
                  </div>
                )
              case 'month':
                return (
                  <div
                    key={index}
                    className={clsx(
                      'flex w-full h-8 justify-center items-center',
                      corner,
                      cell.current && 'font-bold text-ellipsis',
                      'hover:bg-primary-hover hover:text-white hover:cursor-pointer'
                    )}
                    onClick={() => {
                      const updateTime = dayjs.unix(cell.start)
                      udpateTime([{ unit: 'month', value: updateTime.month() }])
                      zoomIn()
                    }}
                  >
                    {cell.name}
                  </div>
                )
              default:
                throw new Error(`Unimplemented view: ${view}`)
            }
          }}
        />
        <div className={clsx('flex w-full', Spacing.gap.extratight)}>
          <Input
            value={dayjs.unix(mergedValue).hour()}
            size='xs'
            type='number'
            prefix='hh'
            onChange={(value) => {
              udpateTime([{ unit: 'hour', value }])
            }}
          />
          <Input value={dayjs.unix(mergedValue).minute()} size='xs' type='number' prefix='mm' onChange={(value) => {
              udpateTime([{ unit: 'minute', value }])
            }} />
          <Input value={dayjs.unix(mergedValue).second()} size='xs' type='number' prefix='ss'
          onChange={(value) => {
            udpateTime([{ unit: 'second', value }])
          }} />
        </div>
      </div>
    </SelectBase>
  )
}

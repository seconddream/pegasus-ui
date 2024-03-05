import { Withlocale } from '../../shared/interfaces'
import { padToArray } from '../../shared/helpers'
import clsx from 'clsx'
import dayjs from 'dayjs'
import 'dayjs/locale/de'
import { ReactNode, useMemo } from 'react'
export type CalendarCell = { name: string; start: number; end: number; current: boolean; outside: boolean }

export interface CalendarBaseProps extends Withlocale {
  width?: string
  anchorTime: number
  local?: boolean

  view?: 'year' | 'month' | 'week' | 'day'
  titleRenderer?: (title: string, index: number, view: 'year' | 'month' | 'week' | 'day') => ReactNode
  cellRenderer: (cell: CalendarCell, index: number, view: 'year' | 'month' | 'week' | 'day') => ReactNode
}

export default function CalendarBase(props: CalendarBaseProps) {
  const { width='min-w-64', anchorTime, locale = 'en', view = 'week', titleRenderer, cellRenderer } = props

  const titles = useMemo(() => {
    switch (view) {
      case 'week':
        return Array.from(Array(7).keys()).map((i) => {
          return dayjs.unix(anchorTime).startOf('week').add(i+1, 'day').locale(locale).format('ddd')
        })
      case 'day':
        return [
          ...Array.from(Array(12).keys()).map((i) => {
            return ((i - 1) * 2 + 2).toString().padStart(2, '0') + ':00'
          }),
          '23:59',
        ]
      default:
        return null
    }
  }, [view, locale])
  // console.log(titles)

  const cells = useMemo((): CalendarCell[] => {
    const anchorTimeObj = dayjs.unix(anchorTime)
    switch (view) {
      case 'year':
        const currentYear = anchorTimeObj.year()
        const yearList = padToArray(currentYear, 7)
        return yearList.map((i) => ({
          name: i.toString(),
          start: dayjs().year(i).startOf('year').unix(),
          end: dayjs().year(i).endOf('year').unix(),
          current: i === dayjs().year(),
          outside: false,
        }))
      case 'month':
        const monthList = Array.from(Array(12).keys()).map((i) => {
          const d = dayjs().month(i)
          return {
            name: d.locale(locale).format('MMM'),
            start: dayjs.unix(anchorTime).month(i).startOf('month').unix(),
            end: dayjs.unix(anchorTime).month(i).endOf('month').unix(),
            current: i === dayjs().month(),
            outside: false,
          }
        })
        return monthList
      case 'week':
        let dateInMonth = Array.from(Array(dayjs.unix(anchorTime).endOf('month').date()).keys()).map((i) => ({
          name: (i + 1).toString().padStart(2, '0'),
          start: dayjs
            .unix(anchorTime)
            .date(i + 1)
            .startOf('day')
            .unix(),
          end: dayjs
            .unix(anchorTime)
            .date(i + 1)
            .endOf('day')
            .unix(),
          current: i + 1 === dayjs().date(),
          outside: false,
        }))
        const monthStartWeekDay = dayjs.unix(anchorTime).startOf('month').day()
        if (monthStartWeekDay !== 1) {
          dateInMonth = [
            ...Array.from(Array(monthStartWeekDay - 1).keys())
              .reverse()
              .map((i) => {
                const time = dayjs
                  .unix(anchorTime)
                  .startOf('month')
                  .subtract(i + 1, 'day')
                return {
                  name: time.date().toString().padStart(2, '0'),
                  start: time.startOf('day').unix(),
                  end: time.endOf('day').unix(),
                  current: false,
                  outside: true,
                }
              }),
            ...dateInMonth,
          ]
        }
        const monthEndWeekDay = dayjs.unix(anchorTime).endOf('month').day()
        if (monthEndWeekDay !== 0) {
          dateInMonth = [
            ...dateInMonth,
            ...Array.from(Array(7 - monthEndWeekDay).keys()).map((i) => {
              const time = dayjs
                .unix(anchorTime)
                .endOf('month')
                .add(i + 1, 'day')
              return {
                name: time.date().toString().padStart(2, '0'),
                start: time.startOf('day').unix(),
                end: time.endOf('day').unix(),
                current: false,
                outside: true,
              }
            }),
          ]
        }
        return dateInMonth
      case 'day':
        return [
          {
            name: dayjs.unix(anchorTime).locale(locale).format('YYYY-MMM-DD'),
            start: dayjs.unix(anchorTime).startOf('day').unix(),
            end: dayjs.unix(anchorTime).endOf('day').unix(),
            current: false,
            outside: false,
          },
        ]
      default:
        throw new Error(`Unknow view: ${view}`)
    }
  }, [locale, view, anchorTime])
  // console.log(cells)

  return (
    // container
    <div className={clsx('flex flex-col', width)}>
      {/* title */}
      {titles && titleRenderer && (
        <div className={clsx('w-full', view === 'week' && 'grid grid-cols-7', view === 'day' && 'flex')}>
          {titles.map((title: string, index: number) => {
            return titleRenderer(title, index, view)
          })}
        </div>
      )}
      {/* content */}
      <div
        className={clsx(
          'w-full',
          view === 'year' && 'grid grid-cols-5',
          view === 'month' && 'grid grid-cols-3',
          view === 'week' && 'grid grid-cols-7',
          view === 'day' && 'flex'
        )}
      >
        {cells.map((cell, index) => {
          return cellRenderer(cell, index, view)
        })}
      </div>
    </div>
  )
}

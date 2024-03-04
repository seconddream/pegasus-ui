import { padToArray } from '@/pegasus-ui/shared/helpers'
import clsx from 'clsx'
import moment from 'moment'
import { ReactNode, useCallback } from 'react'

export interface CalendarProps {
  anchorTime: number
  locales?: string
  local?: boolean

  view?: 'year' | 'month' | 'week' | 'day'
  cellRenderer: (
    cell: { name: string; start: number; end: number },
    index: number
  ) => ReactNode
}

export function Calendar(props: CalendarProps) {
  const {
    anchorTime,
    locales = 'en-US',
    view = 'week',
    cellRenderer,
  } = props

  const getCells = useCallback(() => {
    const anchorTimeObj = new Date(anchorTime * 1000)
    switch (view) {
      case 'year':
        const currentYear = anchorTimeObj.getFullYear()
        const yearList = padToArray(currentYear, 4)
        return yearList.map((i) => ({
          name: i.toString(),
          start: moment().year(i).startOf('year').unix(),
          end: moment().year(i).endOf('year').unix(),
        }))
      case 'month':
        const monthList = Array.from(Array(12).keys()).map((i) => {
          const d = new Date()
          d.setUTCMonth(i)
          return {
            name: d.toLocaleString(locales, { month: 'short' }),
            start: moment.unix(anchorTime).month(i).startOf('month').unix(),
            end: moment.unix(anchorTime).month(i).endOf('month').unix(),
          }
        })
        return monthList
      case 'week':
        let dateInMonth = Array.from(
          Array(moment.unix(anchorTime).endOf('month').date()).keys()
        ).map((i) => ({
          name: (i + 1).toString().padStart(2, '0'),
          start: moment
            .unix(anchorTime)
            .date(i + 1)
            .startOf('day')
            .unix(),
          end: moment
            .unix(anchorTime)
            .date(i + 1)
            .endOf('day')
            .unix(),
        }))
        const monthStartWeekDay = moment
          .unix(anchorTime)
          .startOf('month')
          .isoWeekday()
        if (monthStartWeekDay !== 1) {
          dateInMonth = [
            ...Array.from(Array(monthStartWeekDay - 1).keys())
              .reverse()
              .map((i) => {
                const time = moment
                  .unix(anchorTime)
                  .startOf('month')
                  .subtract(i + 1, 'day')
                return {
                  name: time.date().toString().padStart(2, '0'),
                  start: time.startOf('day').unix(),
                  end: time.endOf('day').unix(),
                }
              }),
            ...dateInMonth,
          ]
        }
        const monthEndWeekDay = moment
          .unix(anchorTime)
          .endOf('month')
          .isoWeekday()
        if (monthEndWeekDay !== 7) {
          dateInMonth = [
            ...dateInMonth,
            ...Array.from(Array(7 - monthEndWeekDay).keys()).map((i) => {
              const time = moment
                .unix(anchorTime)
                .endOf('month')
                .add(i + 1, 'day')
              return {
                name: time.date().toString().padStart(2, '0'),
                start: time.startOf('day').unix(),
                end: time.endOf('day').unix(),
              }
            }),
          ]
        }
        return dateInMonth
      case 'day':
        return Array.from(Array(24).keys()).map((i) => {
          const time = moment.unix(anchorTime).hour(i + 1)
          return {
            name: i.toString().padStart(2, '0') + ':00',
            start: time.startOf('hour').unix(),
            end: time.endOf('hour').unix(),
          }
        })
      default:
        throw new Error(`Unknow view: ${view}`)
    }
  }, [locales, view, anchorTime])
  console.log(getCells())

  return (
    <div
      className={clsx(
        view === 'year' && 'grid grid-cols-3',
        view === 'month' && 'grid grid-cols-3',
        view === 'week' && 'grid grid-cols-7',
        view === 'day' && 'flex'
      )}
    >
      {getCells().map((cell, index) => {
        return cellRenderer(cell, index)
      })}
    </div>
  )
}

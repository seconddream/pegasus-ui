import { Children, Fragment, ReactNode, useRef, useState } from 'react'
import clsx from 'clsx'

import {
  WithDirection,
  WithId,
  WithSpacing,
  parseDirection,
} from '../../shared/interfaces'
import { Sizing, Spacing } from '../../shared/styles'
import {
  AiOutlineDown,
  AiOutlineExclamationCircle,
  AiOutlineLeft,
  AiOutlineLoading3Quarters,
  AiOutlineUp,
} from 'react-icons/ai'
import ButtonBase from '../Button/ButtonBase'
import Divider from '../Divider'
import useFading from '@/pegasus-ui/hooks/useReveal'
import useReveal from '@/pegasus-ui/hooks/useReveal'

export interface SectionProps extends WithId, WithDirection, WithSpacing {
  title: string
  tools?: ReactNode[]
  loading?: boolean
  error?: boolean
  errorMessage?: string
  collapsible?: boolean
  collapsed?: boolean
  onCollapse?: (collaped: boolean) => any
  summary?: ReactNode
  children?: ReactNode | ReactNode[]
}

export default function Section(props: SectionProps) {
  const {
    id,
    title,
    direction = 'vertical',
    space = 'relaxed',
    loading = false,
    error = false,
    errorMessage,
    tools,
    collapsible = false,
    collapsed,
    onCollapse,
    summary,
    children,
  } = props
  const { vertical } = parseDirection(direction)
  const _isControlled = collapsed !== undefined

  const _collapsedInitValue = _isControlled ? collapsed : false
  const [_collapsed, _setCollapsed] = useState(_collapsedInitValue)
  const isCollapsed = _isControlled ? collapsed : _collapsed
  const { fontSize, iconSize } = Sizing.lg
  const description = !loading && !error && isCollapsed ? summary : ''

  const contentRef = useRef<HTMLDivElement>(null)
  const contentReveal = useReveal(contentRef, 'slide-down')

  const toggleCollapse = () => {
    contentReveal.toggle()
    if (_isControlled) {
      onCollapse?.(!isCollapsed)
    } else {
      _setCollapsed(!isCollapsed)
    }
  }

  return (
    <div
      id={id}
      className={clsx(
        'flex w-full flex-wrap justify-center items-center flex-col',
        Spacing.gap.normal
      )}
    >
      {/* header  */}
      <div
        className={clsx(
          'flex flex-wrap w-full justify-start items-center',
          Spacing.gap.tight
        )}
      >
        {/* title  */}
        <div
          className={clsx(
            'flex flex-wrap justify-center items-center',
            fontSize,
            iconSize,
            !loading && error ? 'text-warning' : 'text-content',
            Spacing.gap.tight
          )}
        >
          {loading && <AiOutlineLoading3Quarters className='animate-spin' />}
          {!loading && error && <AiOutlineExclamationCircle />}
          <span className={clsx('font-semibold')}>{title}</span>
        </div>
        {/* description  */}

        <div
          className={clsx(
            'flex font-extralight text-deemphasized-content',
            Spacing.gap.tight
          )}
        >
          {(error || description) && !loading && <Divider />}
          {!loading && error && <span>{errorMessage}</span>}
          {description && <span>{description}</span>}
        </div>

        <div className='flex-grow' />
        {/* tools */}
        {tools && (
          <div
            className={clsx(
              'flex flex-wrap justify-start items-center',
              Spacing.gap.extratight
            )}
          >
            {tools.map((tool, index) => {
              return <Fragment key={index}>{tool}</Fragment>
            })}
          </div>
        )}
        {/* collapse control  */}
        {tools && tools.length > 0 && collapsible && <Divider />}
        {collapsible && (
          <ButtonBase
            icon={isCollapsed ? <AiOutlineLeft /> : <AiOutlineDown />}
            type='secondary'
            shape='circle'
            onClick={toggleCollapse}
          />
        )}
      </div>
      {/* content  */}
      <div
        ref={contentRef}
        className={clsx(
          'flex w-full',
          !vertical && 'flex-wrap',
          vertical && 'flex-col',
          Spacing.gap[space]
        )}
      >
        {children}
      </div>
    </div>
  )
}

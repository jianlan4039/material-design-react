import React, {forwardRef, ReactNode, useEffect, useRef, useState} from 'react'
import c from 'classnames'
import './Badge.scss'

export interface BadgeProps {
  children?: ReactNode
  size?: 'small' | 'large'
  count?: number
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  const {
    children,
    size,
    count = 0,
    ...rest
  } = props

  const _count = count > 999 ? '999+' : count
  const [badgeInsetInlineStart, setBadgeInsetInlineStart] = useState<number>()
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && size === 'large') {
      const containerWidth = containerRef.current.getBoundingClientRect().width
      console.log(containerWidth)
      const offsetInsetToStart = Math.round(containerWidth - 12)
      setBadgeInsetInlineStart(offsetInsetToStart)
    }
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className={'badge-container'}
    >
      <span
        className={c('badge', {
          'badge--large': size === 'large',
          'badge--small': size === 'small'
        })}
        style={{insetInlineStart: `${badgeInsetInlineStart}px`}}
      >
        {size === 'large' && _count}
      </span>
      {children}
    </div>
  )
})

export default Badge;
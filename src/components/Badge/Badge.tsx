import React, {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from 'react'
import c from 'classnames'
import './Badge.scss'

export interface BadgeProps {
  children?: ReactNode
  size?: 'small' | 'large'
  count?: number
  stayShow?: boolean
}

export interface BadgeHandle {
  root?: HTMLDivElement | null
}

const Badge: React.FC<BadgeProps> = forwardRef<BadgeHandle, BadgeProps>((props, ref) => {
  const {
    children,
    size,
    count = 0,
    stayShow = false
  } = props

  const _count = count > 999 ? '999+' : count
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState<boolean>(false)

  useEffect(() => {
    setIsHidden(count <= 0 || stayShow)
  }, [count]);

  useImperativeHandle(ref, () => ({
    root: containerRef.current
  }))

  return (
    <div
      ref={containerRef}
      className={'badge-container'}
    >
      <span
        className={c('badge', {
          'badge--large': size === 'large',
          'badge--small': size === 'small',
          'hidden': isHidden
        })}
      >
        {size === 'large' && _count}
      </span>
      {children}
    </div>
  )
})

export default Badge;
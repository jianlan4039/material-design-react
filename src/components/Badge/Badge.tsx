import React, {ReactNode} from 'react'
import c from 'classnames'
import './Badge.scss'

export interface BadgeProps {
  children?: ReactNode
  size?: 'small' | 'large'
  count?: number
  stayShow?: boolean  // keep shown whenever the count is 0
}

const Badge: React.FC<BadgeProps> = ((props) => {
  const {
    children,
    size = 'small',
    count = 0,
    stayShow = false
  } = props

  const _count = count > 999 ? '999+' : count;

  return (
    <div className={'nd-badge-container'}>
      <span
        aria-label={_count.toString()}
        className={c('nd-badge', {
          'large': size === 'large',
          'small': size === 'small',
          'hidden': stayShow ? false : count <= 0
        })}
      >
        {size === 'large' && _count}
      </span>
      {children}
    </div>
  )
})

export default Badge;
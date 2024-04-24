import React, {forwardRef, HTMLAttributes, ReactNode} from 'react'
import './Indicator.scss'
import c from 'classnames'

export interface IndicatorProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  animating?: boolean
  active?: boolean
}

const Indicator = forwardRef<HTMLDivElement, IndicatorProps>((props, ref) => {
  const {
    children,
    animating,
    className,
    active,
    ...rest
  } = props

  return (
    <div
      ref={ref}
      className={c('navigation-indicator', className, {
        'animating': animating,
        'active': active
      })}
      {...rest}
    ></div>
  )
})

export default Indicator;
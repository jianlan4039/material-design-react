import React, {forwardRef, HTMLAttributes, ReactNode} from 'react'
import './Indicator.scss'
import c from 'classnames'
import useRipple from "../../Ripple/useRipple";

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
    onMouseDown,
    onMouseUp,
    onMouseOver,
    onMouseOut,
    onTouchStart,
    onTouchEnd,
    ...rest
  } = props

  const [rippleProps, ripple] = useRipple<HTMLDivElement>({
    onMouseDown, onMouseUp, onMouseOver, onMouseOut, onTouchStart, onTouchEnd
  })

  return (
    <div
      ref={ref}
      className={c('navigation-indicator', className, {
        'animating': animating,
        'active': active
      })}
      {...rippleProps}
      {...rest}
    >
      {ripple}
    </div>
  )
})

export default Indicator;
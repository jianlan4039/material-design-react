import React, {forwardRef, HTMLAttributes, ReactNode} from 'react'
import './Indicator.scss'
import c from 'classnames'
import StateLayer from "../../StateLayer";
import {StateElement} from "../../internal/common/StateElement";

export interface IndicatorProps extends HTMLAttributes<HTMLDivElement>, StateElement {
  children?: ReactNode
  animating?: boolean
  active?: boolean
}

const Indicator = StateLayer<HTMLDivElement, IndicatorProps>(forwardRef<HTMLDivElement, IndicatorProps>((props, ref) => {
  const {
    children,
    animating,
    className,
    active,
    stateLayer,
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
    >
      {stateLayer}
    </div>
  )
}))

export default Indicator;
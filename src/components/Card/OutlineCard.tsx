import React, {forwardRef, ReactNode} from 'react'
import Card, {CardProps} from "./internal/Card";
import Elevation from "../Elevation";
import cln from "classnames";
import './OutlineCard.scss'
import Outline from "../Outline/Outline";
import useRipple from "../Ripple/useRipple";

export interface OutlineCardProps extends CardProps {
  children?: ReactNode
}

const OutlineCard = forwardRef<HTMLDivElement, OutlineCardProps>((props, ref) => {
  const {
    children,
    style,
    className,
    disabled,
    ...rest
  } = props

  const [rippleProps, ripple] = useRipple({})

  return (
    <div
      ref={ref}
      className={cln('nd-outline-card', className, {
        'nd-disabled': disabled
      })}
      style={style}
      {...rippleProps}
    >
      <Outline></Outline>
      <Elevation></Elevation>
      {ripple}
      <Card disabled={disabled} {...rest}>{children}</Card>
    </div>
  )
})

export default OutlineCard
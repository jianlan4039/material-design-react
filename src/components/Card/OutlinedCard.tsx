import React, {forwardRef, ReactNode} from 'react'
import Card, {CardProps} from "./internal/Card";
import Elevation from "../Elevation";
import cln from "classnames";
import './OutlinedCard.scss'
import Outline from "../Outline/Outline";
import useRipple from "../Ripple/useRipple";

export interface OutlineCardProps extends CardProps {
  children?: ReactNode,
  interactive?: boolean
}

const OutlinedCard = forwardRef<HTMLDivElement, OutlineCardProps>((props, ref) => {
  const {
    children,
    className,
    disabled,
    interactive = true,
    ...rest
  } = props

  const [rippleProps, ripple] = useRipple({})

  return (
    <div
      ref={ref}
      className={cln('nd-outline-card', className, {
        'nd-disabled': disabled,
        'nd-card--static': !interactive,
      })}
      {...rippleProps}
    >
      <Outline></Outline>
      <Elevation></Elevation>
      {interactive && ripple}
      <Card disabled={disabled} {...rest}>{children}</Card>
    </div>
  )
})

export default OutlinedCard
import React, {forwardRef, ReactNode} from 'react'
import Card, {CardProps} from "./internal/Card";
import Elevation from "../Elevation";
import cln from "classnames";
import './ElevatedCard.scss'
import useRipple from "../Ripple/useRipple";


export interface ElevatedCardProps extends CardProps {
  children?: ReactNode
  interactive?: boolean
}

const ElevatedCard = forwardRef<HTMLDivElement, ElevatedCardProps>((props, ref) => {
  const {
    children,
    style,
    className,
    disabled,
    interactive = true,
    ...rest
  } = props

  const [rippleProps, ripple] = useRipple({})

  return (
    <div
      ref={ref}
      className={cln('nd-elevated-card', className, {
        'nd-disabled': disabled,
        'nd-card--static': !interactive,
      })}
      style={style}
      {...rippleProps}
    >
      <Elevation></Elevation>
      {interactive && ripple}
      <Card disabled={disabled} {...rest}>{children}</Card>
    </div>
  )
})

export default ElevatedCard
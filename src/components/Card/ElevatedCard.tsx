import React, {forwardRef, ReactNode} from 'react'
import Card, {CardProps} from "./internal/Card";
import Elevation from "../Elevation";
import cln from "classnames";
import './ElevatedCard.scss'
import useRipple from "../Ripple/useRipple";


export interface ElevatedCardProps extends CardProps {
  children?: ReactNode
}

const ElevatedCard = forwardRef<HTMLDivElement, ElevatedCardProps>((props, ref) => {
  const {
    children,
    style,
    disabled,
    ...rest
  } = props

  const [rippleProps, ripple] = useRipple({})

  return (
    <div
      ref={ref}
      className={cln('nd-elevated-card', {
        'nd-disabled': disabled
      })}
      style={style}
      {...rippleProps}
    >
      <Elevation></Elevation>
      {ripple}
      <Card disabled={disabled} {...rest}>{children}</Card>
    </div>
  )
})

export default ElevatedCard
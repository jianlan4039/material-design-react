import React, {forwardRef, ReactNode} from 'react'
import CardContent, {CardContentProps} from "./internal/CardContent";
import Elevation from "../Elevation";
import cln from "classnames";
import './ElevatedCard.scss'
import useRipple from "../Ripple/useRipple";


export interface ElevatedCardProps extends CardContentProps {
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
      <CardContent disabled={disabled} {...rest}>{children}</CardContent>
    </div>
  )
})

export default ElevatedCard
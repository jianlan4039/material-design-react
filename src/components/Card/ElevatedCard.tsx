import React, {forwardRef, ReactNode} from 'react'
import Card, {CardProps} from "./internal/Card";
import Elevation from "../Elevation";
import cln from "classnames";
import './ElevatedCard.scss'
import StatefulBox from "../StatefulBox/StatefulBox";
import UseRipple from "../Ripple/useRipple";

export interface ElevatedCardProps extends CardProps {
  children?: ReactNode
  interactive?: boolean
}

const ElevatedCard = forwardRef<HTMLDivElement, ElevatedCardProps>((props, ref) => {
  const {
    children,
    className,
    disabled,
    interactive = true,
    ...rest
  } = props

  return (
    <StatefulBox
      ref={ref}
      className={cln('nd-elevated-card', className, {
        'nd-card--static': !interactive,
      })}
    >
      <Elevation></Elevation>
      {/*<UseRipple disabled={disabled}>*/}
      {/*  */}
      {/*</UseRipple>*/}
      <Card disabled={disabled} {...rest}>{children}</Card>
    </StatefulBox>
  )
})

export default ElevatedCard
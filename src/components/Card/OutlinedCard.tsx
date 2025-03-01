import React, {forwardRef, ReactNode} from 'react'
import Card, {CardProps} from "./internal/Card";
import Elevation from "../Elevation";
import cln from "classnames";
import './OutlinedCard.scss'
import Outline from "../Outline/Outline";
import UseRipple from "../Ripple/useRipple";
import StatefulBox from "../StatefulBox/StatefulBox";

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

  return (
    <StatefulBox
      ref={ref}
      className={cln('nd-outline-card', className, {
        'nd-disabled': disabled,
        'nd-card--static': !interactive,
      })}
    >
      <Outline></Outline>
      <Elevation></Elevation>
      <Card disabled={disabled} {...rest}>{children}</Card>
    </StatefulBox>
  )
})

export default OutlinedCard
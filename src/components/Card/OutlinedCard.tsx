import React, {forwardRef, ReactNode} from 'react'
import Card, {CardProps} from "./internal/Card";
import cln from "classnames";
import './OutlinedCard.scss'
import Outline from "../Outline/Outline";
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
      <Card disabled={disabled} {...rest}>{children}</Card>
    </StatefulBox>
  )
})

export default OutlinedCard
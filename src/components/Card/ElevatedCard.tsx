import React, {forwardRef, ReactNode} from 'react'
import Card, {CardProps} from "./internal/Card";
import cln from "classnames";
import './ElevatedCard.scss'
import StatefulBox from "../StatefulBox/StatefulBox";

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
      focusable={false}
    >
      <Card disabled={disabled} {...rest}>{children}</Card>
    </StatefulBox>
  )
})

export default ElevatedCard
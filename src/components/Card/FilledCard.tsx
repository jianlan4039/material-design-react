import React, {forwardRef, ReactNode} from 'react'
import './FilledCard.scss'
import Card, {CardProps} from "./internal/Card";
import Elevation from "../Elevation";
import cln from "classnames";
import UseRipple from "../Ripple/useRipple";
import StatefulBox from "../StatefulBox/StatefulBox";

export interface FilledCardProps extends CardProps {
  children?: ReactNode
  interactive?: boolean
}

const FilledCard = forwardRef<HTMLDivElement, FilledCardProps>((props: FilledCardProps, ref) => {
  const {
    children,
    disabled,
    className,
    interactive = true,
    ...rest
  } = props



  return (
    <StatefulBox
      ref={ref}
      className={cln('nd-filled-card', className, {
        'nd-disabled': disabled,
        'nd-card--static': !interactive,
      })}
    >
      <Elevation></Elevation>

      <Card disabled={disabled} {...rest}>{children}</Card>
    </StatefulBox>
  )
})

export default FilledCard
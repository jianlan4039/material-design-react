import React, {forwardRef, ReactNode} from 'react'
import CardContent, {CardContentProps} from "./internal/CardContent";
import Elevation from "../Elevation";
import cln from "classnames";
import './FilledCard.scss'
import useRipple from "../Ripple/useRipple";

export interface FilledCardProps extends CardContentProps {
  children?: ReactNode
}

const FilledCard = forwardRef<HTMLDivElement, FilledCardProps>((props: FilledCardProps, ref) => {
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
      className={cln('nd-filled-card', {
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

export default FilledCard
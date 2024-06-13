import React, {forwardRef, ReactNode} from 'react'
import CardContent, {CardContentProps} from "./internal/CardContent";
import Elevation from "../Elevation";
import withStateLayer from "../StateLayer";
import cln from "classnames";
import './ElevatedCard.scss'
import {StateElement} from "../internal/common/StateElement";


export interface ElevatedCardProps extends CardContentProps, StateElement{
  children?: ReactNode
}

const ElevatedCard = withStateLayer<HTMLDivElement, ElevatedCardProps>(forwardRef<HTMLDivElement, ElevatedCardProps>((props, ref) => {
  const {
    children,
    style,
    disabled,
    stateLayer,
    ...rest
  } = props

  return (
    <div
      ref={ref}
      className={cln('nd-elevated-card', {
        'nd-disabled': disabled
      })}
      style={style}
    >
      <Elevation></Elevation>
      {stateLayer}
      <CardContent disabled={disabled} {...rest}>{children}</CardContent>
    </div>
  )
}))

export default ElevatedCard
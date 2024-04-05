import React, {forwardRef, ReactNode} from 'react'
import CardContent, {CardContentProps} from "./content/CardContent";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import cln from "classnames";
import './ElevatedCard.scss'
import FocusRing from "../Focus/FocusRing";
import {StateElement} from "../internal/common/StateElement";


export interface ElevatedCardProps extends CardContentProps, StateElement{
  children?: ReactNode
}

const ElevatedCard = StateLayer<HTMLDivElement, ElevatedCardProps>(forwardRef<HTMLDivElement, ElevatedCardProps>((props, ref) => {
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
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      {stateLayer}
      <CardContent disabled={disabled} {...rest}>{children}</CardContent>
    </div>
  )
}))

export default ElevatedCard
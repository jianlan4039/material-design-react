import React, {forwardRef, ReactNode} from 'react'
import CardContent, {CardContentProps} from "./content/CardContent";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import cln from "classnames";
import FocusRing from "../Focus/FocusRing";
import './OutlineCard.scss'
import Outline from "../Outline/Outline";
import {StateElement} from "../internal/common/StateElement";

export interface OutlineCardProps extends CardContentProps, StateElement {
  children?: ReactNode
}

const OutlineCard = StateLayer<HTMLDivElement, OutlineCardProps>(forwardRef<HTMLDivElement, OutlineCardProps>((props, ref) => {
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
      className={cln('nd-outline-card', {
        'nd-disabled': disabled
      })}
      style={style}
    >
      <Outline></Outline>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      {stateLayer}
      <CardContent disabled={disabled} {...rest}>{children}</CardContent>
    </div>
  )
}))

export default OutlineCard
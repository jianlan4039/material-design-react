import React, {forwardRef, ReactNode} from 'react'
import CardContent, {CardContentProps} from "./internal/CardContent";
import Elevation from "../Elevation";
import withStateLayer from "../StateLayer";
import cln from "classnames";
import './OutlineCard.scss'
import Outline from "../Outline/Outline";
import {StateElement} from "../internal/common/StateElement";

export interface OutlineCardProps extends CardContentProps, StateElement {
  children?: ReactNode
}

const OutlineCard = withStateLayer<HTMLDivElement, OutlineCardProps>(forwardRef<HTMLDivElement, OutlineCardProps>((props, ref) => {
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
      <Elevation></Elevation>
      {stateLayer}
      <CardContent disabled={disabled} {...rest}>{children}</CardContent>
    </div>
  )
}))

export default OutlineCard
import React, {forwardRef, ReactNode} from 'react'
import CardContent, {CardContentProps} from "./internal/CardContent";
import Elevation from "../Elevation";
import withStateLayer from "../StateLayer";
import cln from "classnames";
import './FilledCard.scss'
import {StateElement} from "../internal/common/StateElement";

export interface FilledCardProps extends CardContentProps, StateElement {
  children?: ReactNode
}

const FilledCard = withStateLayer<HTMLDivElement, FilledCardProps>(forwardRef<HTMLDivElement, FilledCardProps>((props: FilledCardProps, ref) => {
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
      className={cln('nd-filled-card', {
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

export default FilledCard
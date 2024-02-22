import React, {forwardRef, ReactNode} from 'react'
import CardContent, {CardContentProps} from "./content/CardContent";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import cln from "classnames";
import FocusRing from "../Focus/FocusRing";
import './OutlineCard.scss'
import Outline from "../Outline/Outline";


export interface OutlineCardProps extends CardContentProps {
  children?: ReactNode
}

const OutlineCard = forwardRef((props: OutlineCardProps, ref) => {
  const {
    children,
    style,
    disabled,
    ...rest
  } = props

  return (
    <div
      className={cln('nd-outline-card', {
        'nd-disabled': disabled
      })}
      style={style}
    >
      <Outline></Outline>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      <StateLayer disabled={disabled}></StateLayer>
      <CardContent disabled={disabled} {...rest}>{children}</CardContent>
    </div>
  )
})

export default OutlineCard
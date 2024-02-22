import React, {forwardRef, ReactNode} from 'react'
import CardContent, {CardContentProps} from "./content/CardContent";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import cln from "classnames";
import './ElevatedCard.scss'
import FocusRing from "../Focus/FocusRing";


export interface ElevatedCardProps extends CardContentProps {
  children?: ReactNode
}

const ElevatedCard = forwardRef((props: ElevatedCardProps, ref) => {
  const {
    children,
    style,
    disabled,
    ...rest
  } = props

  return (
    <div
      className={cln('nd-elevated-card', {
        'nd-disabled': disabled
      })}
      style={style}
    >
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      <StateLayer disabled={disabled}></StateLayer>
      <CardContent disabled={disabled} {...rest}>{children}</CardContent>
    </div>
  )
})

export default ElevatedCard
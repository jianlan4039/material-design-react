import React, {ReactNode} from 'react'
import Button from "./content/Button";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import FocusRing from "../Focus/FocusRing";
import cln from "classnames";
import './FAB.scss'

export interface FABProps {
  children?: ReactNode
  size?: 'small' | "large" | "default"
  variant?: 'surface' | 'primary' | 'secondary' | 'tertiary'
  lowered?: boolean
}

export default function FAB(props: FABProps) {
  const {
    children,
    size,
    variant,
    lowered,
    ...rest
  } = props

  return (
    <div
      className={cln('nd-fab', {
        [`${size}`]: size,
        [`nd-fab--${variant}`]: variant,
        'lowered': lowered
      })}
    >
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      <StateLayer></StateLayer>
      <Button>
        {children}
      </Button>
    </div>
  )
}
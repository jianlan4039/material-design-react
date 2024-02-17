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
  theme?: 'primary' | 'secondary' | 'tertiary'
  lowered?: boolean
}

export default function FAB(props: FABProps) {
  const {
    children,
    size,
    theme,
    lowered,
    ...rest
  } = props

  return (
    <div
      className={cln('nd-fab', {
        [`${size}`]: size,
        [`nd-fab--${theme}`]: theme,
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
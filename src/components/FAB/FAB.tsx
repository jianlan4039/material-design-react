import React, {ReactNode} from 'react'
import Button from "./content/Button";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import FocusRing from "../Focus/FocusRing";
import cln from "classnames";
import './FAB.scss'

export interface FABProps {
  children?: ReactNode
  size?: 'small' | "large"
  theme?: 'primary' | 'secondary' | 'tertiary'
}

export default function FAB(props: FABProps) {
  const {
    children,
    size,
    theme,
    ...rest
  } = props

  return (
    <div
      className={cln('nd-fab', {
        [`nd-fab--${size}`]: size,
        [`nd-fab--${theme}`]: theme
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
import React, {forwardRef, ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import Elevation from "../Elevation";
import FocusRing from "../Focus/FocusRing";
import cln from "classnames";
import './FAB.scss'
import {StateElement} from "../internal/common/StateElement";
import withStateLayer from "../StateLayer";

export interface FABProps extends ButtonProps {
  children?: ReactNode
  size?: 'small' | "large" | "default"
  variant?: 'surface' | 'primary' | 'secondary' | 'tertiary'
  lowered?: boolean
}

const FAB = withStateLayer<HTMLButtonElement, FABProps>(forwardRef<HTMLButtonElement, FABProps>((props, ref) => {
  const {
    children,
    size,
    variant,
    lowered,
    stateLayer,
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
      {stateLayer}
      <Button ref={ref} {...rest}>
        {children}
      </Button>
    </div>
  )
}))

export default FAB
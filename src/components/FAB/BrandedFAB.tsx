import React, {forwardRef, ReactNode} from 'react'
import cln from "classnames";
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import Button, {ButtonProps} from "./content/Button";
import './BrandedFAB.scss'
import {FABProps} from "./FAB";

export interface BrandedFABProps extends Omit<FABProps, 'variant'>, ButtonProps {
  children?: ReactNode
  large?: boolean
}

const BrandedFAB = StateLayer<HTMLDivElement, BrandedFABProps>(forwardRef<HTMLDivElement, BrandedFABProps>((props, ref) => {
  const {
    children,
    label,
    icon,
    large,
    lowered,
    stateLayer,
    ...rest
  } = props

  return (
    <div
      className={cln('nd-branded-fab', {
        'large': large,
        'lowered': lowered
      })}
    >
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      {stateLayer}
      <Button icon={icon} label={label} {...rest}>
        {children}
      </Button>
    </div>
  )
}))

export default BrandedFAB
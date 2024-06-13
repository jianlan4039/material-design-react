import React, {forwardRef, ReactNode} from 'react'
import cln from "classnames";
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import withStateLayer from "../StateLayer";
import Button, {ButtonProps} from "./content/Button";
import './BrandedFAB.scss'
import {FABProps} from "./FAB";

export interface BrandedFABProps extends Omit<FABProps, 'variant'>, ButtonProps {
  children?: ReactNode
  large?: boolean
}

const BrandedFAB = withStateLayer<HTMLButtonElement, BrandedFABProps>(forwardRef<HTMLButtonElement, BrandedFABProps>((props, ref) => {
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
      <Button ref={ref} icon={icon} label={label} {...rest}>
        {children}
      </Button>
    </div>
  )
}))

export default BrandedFAB
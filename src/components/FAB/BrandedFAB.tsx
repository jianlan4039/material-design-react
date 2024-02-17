import React, {ReactNode} from 'react'
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

export default function BrandedFAB(props: BrandedFABProps) {
  const {
    children,
    label,
    icon,
    large,
    lowered,
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
      <StateLayer></StateLayer>
      <Button icon={icon} label={label}>
        {children}
      </Button>
    </div>
  )
}
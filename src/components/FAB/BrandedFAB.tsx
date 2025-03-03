import React, {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from 'react'
import cln from "classnames";
import Elevation from "../Elevation";
import Button, {ButtonProps} from "./internal/Button";
import './BrandedFAB.scss'
import {FABProps} from "./FAB";
import useFocusRing from "../Focus/useFocusRing";
import useRipple from "../Ripple/useRipple";
import StatefulBox from "../StatefulBox/StatefulBox";

export interface BrandedFABProps extends Omit<FABProps, 'variant'>, ButtonProps {
  children?: ReactNode
  // large?: boolean
}

export interface BrandedFABHandle {
  button?: HTMLButtonElement | null
}

const BrandedFAB = forwardRef<BrandedFABHandle, BrandedFABProps>((props, ref) => {
  const {
    children,
    label,
    icon,
    // large,
    lowered,
    onBlur,
    onFocus,
    ...rest
  } = props

  const buttonRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => ({
    button: buttonRef.current
  }))

  return (
    <StatefulBox
      className={cln('nd-branded-fab', {
        'lowered': lowered
      })}
    >
      <Button ref={buttonRef} icon={icon} label={label} {...rest}>
        {children}
      </Button>
    </StatefulBox>
  )
})

export default BrandedFAB
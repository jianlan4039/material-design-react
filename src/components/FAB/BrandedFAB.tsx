import React, {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from 'react'
import cln from "classnames";
import Elevation from "../Elevation";
import Button, {ButtonProps} from "./internal/Button";
import './BrandedFAB.scss'
import {FABProps} from "./FAB";
import useFocusRing from "../Focus/useFocusRing";
import useRipple from "../Ripple/useRipple";

export interface BrandedFABProps extends Omit<FABProps, 'variant'>, ButtonProps {
  children?: ReactNode
  large?: boolean
}

export interface BrandedFABHandle {
  button?: HTMLButtonElement | null
}

const BrandedFAB = forwardRef<BrandedFABHandle, BrandedFABProps>((props, ref) => {
  const {
    children,
    label,
    icon,
    large,
    lowered,
    onBlur,
    onFocus,
    ...rest
  } = props

  const button = useRef<HTMLButtonElement>(null);
  const [parent, setParent] = useState<HTMLButtonElement>()

  const [focusRingProps, focusRing] = useFocusRing<HTMLButtonElement>({parent, onBlur, onFocus})
  const [rippleProps, ripple] = useRipple<HTMLDivElement>({})

  useEffect(() => {
    if (button.current) {
      setParent(button.current)
    }
  }, [button]);

  useImperativeHandle(ref, () => ({
    button: button.current
  }))

  return (
    <div
      className={cln('nd-branded-fab', {
        'large': large,
        'lowered': lowered
      })}
      {...rippleProps}
    >
      <Elevation></Elevation>
      {ripple}
      {focusRing}
      <Button ref={button} icon={icon} label={label} {...focusRingProps} {...rest}>
        {children}
      </Button>
    </div>
  )
})

export default BrandedFAB
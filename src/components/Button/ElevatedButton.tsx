import React, {forwardRef, ReactNode, FocusEvent, useRef, useState, useEffect} from 'react'
import './ElevatedButton.scss'
import cln from "classnames";
import Elevation from "../Elevation";
import Button, {ButtonProps} from "./internal/Button";
import {StateElement} from "../internal/common/StateElement";
import useFocusRing from "../Focus/useFocusRing";
import useRipple from "../Ripple/useRipple";

export interface ElevatedButtonProps extends ButtonProps, StateElement {
  children?: ReactNode
}

const ElevatedButton = forwardRef<HTMLButtonElement, ElevatedButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    className,
    onFocus,
    onBlur,
    ...rest
  } = props

  const btnRef = useRef<HTMLButtonElement>(null);
  const [parent, setParent] = useState<HTMLButtonElement>()

  const [focusRingProps, focusRing] = useFocusRing<HTMLButtonElement>({parent, onFocus, onBlur});
  const [rippleProps, ripple] = useRipple<HTMLDivElement>({})

  useEffect(() => {
    if (btnRef.current) {
      setParent(btnRef.current)
    }
  }, [btnRef]);

  return (
    <div className={cln('nd-elevated-button', className, {'nd-disabled': disabled})} {...rippleProps}>
      <Elevation></Elevation>
      {ripple}
      {focusRing}
      <Button
        ref={btnRef}
        disabled={disabled}
        {...focusRingProps}
        {...rest}
      >
        {children}
      </Button>
    </div>
  )
})

export default ElevatedButton
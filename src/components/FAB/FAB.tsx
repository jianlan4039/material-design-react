import React, {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from 'react'
import Button, {ButtonProps} from "./internal/Button";
import Elevation from "../Elevation";
import cln from "classnames";
import './FAB.scss'
import useFocusRing from "../Focus/useFocusRing";
import useRipple from "../Ripple/useRipple";

export interface FABProps extends ButtonProps {
  children?: ReactNode
  size?: 'small' | "large" | "default"
  variant?: 'primary' | 'secondary' | 'tertiary'
  lowered?: boolean
}

export interface FABHandle {
  button?: HTMLButtonElement | null
}

const FAB = forwardRef<FABHandle, FABProps>((props, ref) => {
  const {
    children,
    size,
    variant,
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
      className={cln('nd-fab', {
        [`${size}`]: size,
        [`nd-fab--${variant}`]: variant,
        'lowered': lowered
      })}
      {...rippleProps}
    >
      <Elevation></Elevation>
      {ripple}
      {focusRing}
      <Button ref={button} {...focusRingProps} {...rest}>
        {children}
      </Button>
    </div>
  )
})

export default FAB
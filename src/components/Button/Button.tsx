import React, {forwardRef, HTMLAttributes, useImperativeHandle, useRef} from "react";
import cln from "classnames";
import {default as SharedButton} from "./internal/Button";
import Ripple from "../Ripple/Ripple";
import Elevation from "../Elevation";
import Outline from "../Outline/Outline";
import StatefulBox from '../StatefulBox'
import FocusRing from "../Focus/FocusRing";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  name?: string
  label?: string
  className?: string
  disabled?: boolean
  variant?: "elevated" | "filled" | "filled-tonal" | "text" | "outlined"
}

export interface ButtonHandle {
  container?: HTMLDivElement | null
  button: HTMLButtonElement | null
}

const Button = forwardRef<ButtonHandle, ButtonProps>((props, ref) => {
  const {
    name,
    label,
    className,
    disabled,
    children,
    onBlur,
    onFocus,
    variant,
    ...rest
  } = props

  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => ({
    container: containerRef.current,
    button: btnRef.current
  }))

  return (
    <StatefulBox
      className={cln("nd-button", className, {
        [`nd-${variant}-button`]: variant,
      })}
      disabled={disabled}
    >
      <Elevation></Elevation>
      <FocusRing>
        <Ripple disabled={disabled}>
          {variant === "outlined" && <Outline disabled={disabled}></Outline>}
          <SharedButton
            ref={btnRef}
            disabled={disabled}
            label={label}
            {...rest}
          >
            {children}
          </SharedButton>
        </Ripple>
      </FocusRing>
    </StatefulBox>
  )
})

export default Button;
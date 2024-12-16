import React, {forwardRef, HTMLAttributes, useImperativeHandle, useRef} from "react";
import cln from "classnames";
import Button from "./internal/Button";
import Ripple from "../Ripple/Ripple";
import Elevation from "../Elevation";
import Outline from "../Outline/Outline";
import StatefulBox from '../StatefulBox'
import FocusRing from "../Focus/FocusRing";

export interface CommonButtonProps extends HTMLAttributes<HTMLButtonElement> {
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

const CommonButton = forwardRef<ButtonHandle, CommonButtonProps>((props, ref) => {
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
      className={cln(className, {
        [`nd-${variant}-button`]: variant,
      })}
      disabled={disabled}
    >
      <Elevation></Elevation>
      <FocusRing>
        <Ripple disabled={disabled}>
          {variant === "outlined" && <Outline disabled={disabled}></Outline>}
          <Button
            ref={btnRef}
            disabled={disabled}
            label={label}
            {...rest}
          >
            {children}
          </Button>
        </Ripple>
      </FocusRing>
    </StatefulBox>
  )
})

export default CommonButton;
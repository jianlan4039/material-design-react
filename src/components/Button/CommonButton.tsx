import React, {forwardRef, HTMLAttributes, useImperativeHandle, useRef} from "react";
import cln from "classnames";
import Button from "./internal/Button";
import useFocusRing from "../Focus/useFocusRing";
import Ripple from "../Ripple/Ripple";
import Elevation from "../Elevation";
import Outline from "../Outline/Outline";

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

  const [focusRingProps, focusRing] = useFocusRing<HTMLButtonElement>({parent: btnRef.current, onFocus, onBlur});

  useImperativeHandle(ref, () => ({
    container: containerRef.current,
    button: btnRef.current
  }))

  return (
    <div
      className={cln(className, {
        [`nd-${variant}-button`]: variant,
        'nd-button--disabled': disabled
      })}
    >
      {focusRing}
      <Elevation></Elevation>
      <Ripple>
        {variant === "outlined" && <Outline disabled={disabled}></Outline>}
        <Button
          ref={btnRef}
          disabled={disabled}
          label={label}
          {...focusRingProps}
          {...rest}
        >
          {children}
        </Button>
      </Ripple>
    </div>
  )
})

export default CommonButton;
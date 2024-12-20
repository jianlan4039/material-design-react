import React, {forwardRef, HTMLAttributes, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import cln from "classnames";
import Button from "./internal/Button";
import useFocusRing from "../Focus/useFocusRing";
import useRipple from "../Ripple/useRipple";

export interface CommonButtonProps extends HTMLAttributes<HTMLButtonElement> {
  name?: string
  label?: string | ReactNode
  className?: string
  disabled?: boolean
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
    ...rest
  } = props

  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const [focusRingProps, focusRing] = useFocusRing<HTMLButtonElement>({parent: btnRef.current, onFocus, onBlur});
  const [rippleProps, ripple] = useRipple<HTMLDivElement>({})

  useImperativeHandle(ref, () => ({
    container: containerRef.current,
    button: btnRef.current
  }))

  return (
    <div
      className={cln(
        name,
        className,
        {
          'nd-disabled': disabled
        }
      )}
      {...rippleProps}
    >
      {children}
      {!disabled && ripple}
      {focusRing}
      <Button
        ref={btnRef}
        disabled={disabled}
        label={label}
        {...focusRingProps}
        {...rest}
      ></Button>
    </div>
  )
})

export default CommonButton;
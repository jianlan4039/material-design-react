import React, {forwardRef, HTMLAttributes, ReactNode, useEffect, useImperativeHandle, useRef, useState} from "react";
import cln from "classnames";
import Elevation from "../Elevation";
import Button from "./internal/Button";
import useFocusRing from "../Focus/useFocusRing";
import useRipple from "../Ripple/useRipple";

export interface WrapperProps extends HTMLAttributes<HTMLButtonElement> {
  name?: string
  label?: string | ReactNode
  className?: string
  disabled?: boolean
}

export interface ButtonHandle {
  wrapper?: HTMLDivElement | null
  button: HTMLButtonElement | null
}

const Wrapper = forwardRef<ButtonHandle, WrapperProps>(
  (
    {
      name,
      label,
      className,
      disabled,
      children,
      onBlur,
      onFocus,
      ...rest
    }, ref) => {

    const wrapperRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const [parent, setParent] = useState<HTMLButtonElement>()

    const [focusRingProps, focusRing] = useFocusRing<HTMLButtonElement>({parent, onFocus, onBlur});
    const [rippleProps, ripple] = useRipple<HTMLDivElement>({})

    useEffect(() => {
      if (btnRef.current) {
        setParent(btnRef.current)
      }
    }, [btnRef]);

    useImperativeHandle(ref, () => ({
      wrapper: wrapperRef.current,
      button: btnRef.current
    }))

    return (
      <div className={cln(name, className, {'nd-disabled': disabled})} {...rippleProps}>
        {children}
        {ripple}
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

export default Wrapper;
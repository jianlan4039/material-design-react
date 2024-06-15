import React, {forwardRef, ReactNode, useEffect, useRef, useState} from 'react'
import FocusRing from "../Focus/FocusRing";
import Button, {ButtonProps} from "./internal/Button";
import cln from "classnames";
import './TextButton.scss'
import useFocusRing from "../Focus/useFocusRing";
import useRipple from "../Ripple/useRipple";

export interface TextButtonProps extends ButtonProps {
  children?: ReactNode
}

const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>((props, ref) => {
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
    <div className={cln('nd-text-button', className, {'nd-disabled': disabled})} {...rippleProps}>
      <FocusRing></FocusRing>
      {focusRing}
      {ripple}
      <Button ref={btnRef} disabled={disabled} {...focusRingProps} {...rest}>
        {children}
      </Button>
    </div>
  )
})

export default TextButton

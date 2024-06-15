import React, {forwardRef, ReactNode, useEffect, useRef, useState} from 'react'
import Elevation from "../Elevation";
import Button, {ButtonProps} from "./internal/Button";
import cln from "classnames";
import './OutlinedButton.scss'
import Outline from "../Outline/Outline";
import useFocusRing from "../Focus/useFocusRing";
import useRipple from "../Ripple/useRipple";

export interface OutlinedButtonProps extends ButtonProps {
  children?: ReactNode
}

const OutlinedButton = forwardRef<HTMLButtonElement, OutlinedButtonProps>((props, ref) => {
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
    <div className={cln('nd-outlined-button', className, {'nd-disabled': disabled})} {...rippleProps}>
      <Outline disabled={disabled}></Outline>
      <Elevation></Elevation>
      {focusRing}
      {ripple}
      <Button ref={btnRef} disabled={disabled} {...focusRingProps} {...rest}>
        {children}
      </Button>
    </div>
  )
})

export default OutlinedButton
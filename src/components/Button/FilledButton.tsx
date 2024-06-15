import React, {forwardRef, ReactNode, useEffect, useRef, useState} from 'react'
import Elevation from "../Elevation";
import Button, {ButtonProps} from "./internal/Button";
import cln from "classnames";
import './FilledButton.scss'
import useFocusRing from "../Focus/useFocusRing";
import useRipple from "../Ripple/useRipple";

export interface FilledButtonProps extends ButtonProps {
  children?: ReactNode
}

const FilledButton = forwardRef<HTMLButtonElement, FilledButtonProps>((props, ref) => {
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
    <div className={cln('nd-filled-button', className, {'nd-disabled': disabled})} {...rippleProps}>
      <Elevation></Elevation>
      {focusRing}
      {ripple}
      <Button ref={btnRef} disabled={disabled} {...focusRingProps} {...rest}>
        {children}
      </Button>
    </div>
  )
})

export default FilledButton
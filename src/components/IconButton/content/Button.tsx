import React, {ReactNode, ButtonHTMLAttributes, forwardRef} from 'react'
import {FocusRingProps} from "../../Focus";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, FocusRingProps {
  children?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    focusRing,
    ...rest
  } = props

  return (
    <button ref={ref} className={'nd-icon-button__button'} disabled={disabled} {...rest}>
      {focusRing}
      <span className={'nd-icon-button__icon-slot'}>{children}</span>
    </button>
  )
})

export default Button
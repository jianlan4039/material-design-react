import React, {forwardRef, HTMLAttributes, ReactNode} from 'react'
import StateLayer from "../../StateLayer";
import cln from "classnames";
import {StateElement} from "../../internal/common/StateElement";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, StateElement {
  children?: ReactNode
  icon?: ReactNode
  disabled?: boolean
  elevated?: boolean
}

const Button = StateLayer<HTMLButtonElement, ButtonProps>(forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    icon,
    disabled,
    stateLayer,
    ...rest
  } = props

  return (
    <button
      ref={ref}
      className={cln('nd-chip__button', {
        'nd-chip--with-icon': icon,
      })}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className={'nd-chip__icon-slot'}>{icon}</span>}
      {stateLayer}
      {children && <span className={'nd-chip__label'}>{children}</span>}
    </button>
  )
}))

export default Button
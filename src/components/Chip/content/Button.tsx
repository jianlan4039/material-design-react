import React, {HTMLAttributes, ReactNode} from 'react'
import StateLayer from "../../StateLayer";
import cln from "classnames";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  icon?: ReactNode
  disabled?: boolean
  elevated?: boolean
}

export default function Button(props: ButtonProps) {
  const {
    children,
    icon,
    disabled,
    ...rest
  } = props

  return (
    <button
      className={cln('nd-chip__button', {
        'nd-chip--with-icon': icon,
      })}
      disabled={disabled}
      {...rest}
    >
      <StateLayer disabled={disabled}></StateLayer>
      {icon && <span className={'nd-chip__icon-slot'}>{icon}</span>}
      {children && <span className={'nd-chip__label'}>{children}</span>}
    </button>
  )
}
import React, {HTMLAttributes, ReactNode} from 'react'
import cln from "classnames";
import FocusRing from "../../Focus/FocusRing";
import Elevation from "../../Elevation";
import StateLayer from "../../StateLayer";

export interface CommonButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  children?: ReactNode
  icon?: ReactNode
  trailingIcon?: ReactNode
}

export default function CommonButton(props: CommonButtonProps) {
  const {
    children,
    icon,
    trailingIcon,
    disabled,
    ...rest
  } = props

  return (
    <button
      className={cln('nd-button', {
        'nd-button--has-icon': icon,
        'nd-button--has-trailing-icon': trailingIcon
      })}
      disabled={disabled}
      {...rest}
    >
      <span className={'nd-button__icon-slot'}>{icon}</span>
      {children}
      <span className={'nd-button__trailing-icon-slot'}>{trailingIcon}</span>
    </button>
  )
}
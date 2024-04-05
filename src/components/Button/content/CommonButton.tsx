import React, {forwardRef, HTMLAttributes, ReactNode} from 'react'
import cln from "classnames";
import FocusRing from "../../Focus/FocusRing";
import Elevation from "../../Elevation";
import StateLayer from "../../StateLayer";
import {StateElement} from "../../internal/common/StateElement";

export interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, StateElement {
  disabled?: boolean
  children?: ReactNode
  icon?: ReactNode
  trailingIcon?: ReactNode
}

const CommonButton = forwardRef<HTMLButtonElement, CommonButtonProps>((props, ref) => {
  const {
    children,
    icon,
    trailingIcon,
    disabled,
    ...rest
  } = props

  return (
    <button
      ref={ref}
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
})

export default CommonButton
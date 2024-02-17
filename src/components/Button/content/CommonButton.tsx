import React, {HTMLAttributes, ReactNode} from 'react'
import cln from "classnames";

export interface CommonButtonProps extends HTMLAttributes<HTMLButtonElement>{
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
    ...rest
  } = props

  return (
    <button
      className={cln('nd-button', {
        'nd-button--has-icon': icon,
        'nd-button--has-trailing-icon': trailingIcon
      })}
      {...rest}
    >
      <span className={'nd-button__icon-slot'}>{icon}</span>
      {children}
      <span className={'nd-button__trailing-icon-slot'}>{trailingIcon}</span>
    </button>
  )
}
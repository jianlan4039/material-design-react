import React, {ButtonHTMLAttributes, ReactNode} from 'react'
import {StateElement} from "../../internal/common/StateElement";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, StateElement {
  children?: ReactNode
  label?: string
  icon?: ReactNode
}

export default function Button(props: ButtonProps) {
  const {
    children,
    label,
    icon,
    ...rest
  } = props

  return (
    <button className={'nd-fab__button'} {...rest}>
      <span className={'nd-fab__icon-slot'}>{icon || children}</span>
      <span className={'nd-fab__label-slot'}>{label}</span>
    </button>
  )
}
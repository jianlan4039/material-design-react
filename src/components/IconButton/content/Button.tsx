import React, {HTMLAttributes, ReactNode, useState, MouseEvent} from 'react'
import cln from "classnames";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  disabled?: boolean
  toggled?: boolean
  selected?: boolean
}

export default function Button(props: ButtonProps) {
  const {
    children,
    disabled,
    toggled,
    selected = false,
    onClick,
    ...rest
  } = props

  const [selfSelected, setSelfSelected] = useState<boolean>(selected)

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    e.preventDefault()
    setSelfSelected(!selfSelected)
  }

  return (
    <button
      className={cln('nd-icon-button__button', {
        'nd-toggled': toggled,
        'nd-selected': selfSelected,
      })}
      onClick={clickHandler}
      disabled={disabled}
      {...rest}
    >
      <span className={'nd-icon-button__icon-slot'}>{children}</span>
    </button>
  )
}
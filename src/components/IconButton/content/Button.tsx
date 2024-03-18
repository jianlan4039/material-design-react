import React, {ReactNode, ButtonHTMLAttributes} from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
}

export default function Button(props: ButtonProps) {
  const {
    children,
    ...rest
  } = props

  return (
    <button className={'nd-icon-button__button'} {...rest}>
      <span className={'nd-icon-button__icon-slot'}>{children}</span>
    </button>
  )
}
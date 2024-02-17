import React, {ReactNode} from 'react'

export interface ButtonProps {
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
    <button className={'nd-fab__button'}>
      <span className={'nd-fab__icon-slot'}>{icon || children}</span>
      <span className={'nd-fab__label-slot'}>{label}</span>
    </button>
  )
}
import React, {HTMLAttributes, ReactNode} from 'react'
import cln from "classnames";

export interface CardProps extends HTMLAttributes<HTMLDivElement>{
  children?: ReactNode
  disabled?: boolean
}

export default function Card(props: CardProps) {
  const {
    children,
    disabled,
    ...rest
  } = props

  return (
    <div
      className={cln('nd-card-content', {
        'nd-disabled': disabled
      })}
      {...rest}
    >
      {children}
    </div>
  )
}
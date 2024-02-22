import React, {HTMLAttributes, ReactNode, useState} from 'react'
import cln from "classnames";

export interface CardContentProps extends HTMLAttributes<HTMLDivElement>{
  children?: ReactNode
  disabled?: boolean
}

export default function CardContent(props: CardContentProps) {
  const {
    children,
    disabled,
    ...rest
  } = props

  const [dragged, setDragged] = useState(false)

  return (
    <div
      className={cln('nd-card-content', {
        'nd-disabled': disabled,
        'nd-dragged': dragged
      })}
      {...rest}
    >
      {children}
    </div>
  )
}
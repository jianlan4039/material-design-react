import React, {HTMLAttributes} from 'react'
import './Divider.scss'
import cln from "classnames";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'inset' | 'inset-start' | 'inset-end'
}

export default function Divider(props: DividerProps) {
  const {
    variant,
    ...rest
  } = props

  return (
    <div
      className={cln('nd-divider', {
        [`nd-${variant}`]: variant
      })}
      {...rest}
    ></div>
  )
}
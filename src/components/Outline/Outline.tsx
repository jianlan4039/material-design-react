import React, {HTMLAttributes} from 'react'
import cln from "classnames";
import './Outline.scss'

export interface OutlineProps extends HTMLAttributes<HTMLSpanElement>{
  disabled?: boolean
}

export default function Outline(props: OutlineProps) {
  const {
    disabled,
    ...rest
  } = props

  return <span className={cln('nd-outline', {'nd-disabled': disabled})} {...rest}></span>
}
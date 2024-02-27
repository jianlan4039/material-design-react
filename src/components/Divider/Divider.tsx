import React, {HTMLAttributes} from 'react'
import './Divider.scss'

export interface DividerProps extends HTMLAttributes<HTMLDivElement>{
}

export default function Divider(props: DividerProps) {
  const {
    ...rest
  } = props

  return (
    <div className={'nd-divider'} {...rest}></div>
  )
}
import React, {HTMLAttributes, ReactNode} from 'react'
import './List.scss'

export interface ListProps extends HTMLAttributes<HTMLUListElement>{
  children?: ReactNode
}

export default function List(props: ListProps) {
  const {
    children,
    ...rest
  } = props

  return (
    <ul className={'list'} {...rest}>
      {children}
    </ul>
  )
}
import React, {HTMLAttributes, ReactNode} from 'react'
import './ListContent.scss'

export interface ListContentProps extends HTMLAttributes<HTMLUListElement>{
  children?: ReactNode
}

export default function ListContent(props: ListContentProps) {
  const {
    children,
    ...rest
  } = props

  return (
    <ul className={'nd-list-content'} {...rest}>
      {children}
    </ul>
  )
}
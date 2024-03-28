import React, {forwardRef, HTMLAttributes, HTMLProps, ReactNode} from 'react'
import './List.scss'

export interface ListProps extends HTMLAttributes<HTMLUListElement>{
  children?: ReactNode
}

const List = forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  const {
    children,
    ...rest
  } = props

  return (
    <ul ref={ref} className={'list'} {...rest}>
      {children}
    </ul>
  )
})

export default List
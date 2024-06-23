import React, {forwardRef, OlHTMLAttributes, ReactNode} from 'react'
import './List.scss'

export interface ListProps extends OlHTMLAttributes<HTMLOListElement>{
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
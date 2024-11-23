import React, {forwardRef, OlHTMLAttributes, ReactNode} from 'react'
import './List.scss'
import classNames from 'classnames'

export interface ListProps extends OlHTMLAttributes<HTMLOListElement>{
  children?: ReactNode
}

const List = forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  const {
    children,
    className,
    ...rest
  } = props

  return (
    <ul ref={ref} className={classNames('list', className)} {...rest}>
      {children}
    </ul>
  )
})

export default List
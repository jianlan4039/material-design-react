import React, {HTMLAttributes, ReactNode} from 'react'
import './Container.scss'
import c from 'classnames'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement>{
  children?: ReactNode
  start?: ReactNode
  middle?: ReactNode
  end?: ReactNode
}

export default function Container(props: ContainerProps) {
  const {
    children,
    start,
    middle,
    end,
    className,
    ...rest
  } = props

  return (
    <div className={c('nd-container', className)} {...rest}>
      <div className={'nd-container__start'}>{start}</div>
      <div className={'nd-container__middle'}>
        <div className={'nd-container__content'}>{children}</div>
        {middle}
      </div>
      <div className={'nd-container__end'}>{end}</div>
    </div>
  )
}
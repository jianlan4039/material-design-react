import React, {ReactNode} from 'react'
import 'material-icons/iconfont/material-icons.css';

export interface IconProps {
  children?: ReactNode
}

export default function FilledIcon(props: IconProps) {
  const {
    children,
    ...rest
  } = props

  return <span className={'material-icons'}>
    {children}
  </span>
}
import React, {ReactNode, useRef} from 'react'
import './Drawer.scss'

export interface DrawerProps {
  children?: ReactNode
}

export default function Drawer(props: DrawerProps) {
  const {
    children,
    ...rest
  } = props

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={'nd-drawer'}
      {...rest}
    >
      {children}
    </div>
  )
}
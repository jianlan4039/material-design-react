import React, {ReactNode} from 'react'
import './Elevation.scss'

export interface ElevationProps {
  children?: ReactNode
}

export default function Elevation(props: ElevationProps) {
  const {
    children,
    ...rest
  } = props

  return <div className={'nd-elevation'}>
    {children}
  </div>
}
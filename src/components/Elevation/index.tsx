import React, {forwardRef, ReactNode} from 'react'
import './Elevation.scss'
import {Simulate} from "react-dom/test-utils";

export interface ElevationProps {
  children?: ReactNode
}

const Elevation = forwardRef<HTMLDivElement, ElevationProps>((props, ref) => {
  const {
    children,
    ...rest
  } = props

  return (
    <div ref={ref} className={'nd-elevation'}>
      {children}
    </div>
  )
})

export default Elevation
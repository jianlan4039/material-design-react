import React, {HTMLAttributes} from 'react'
import './Elevation.scss'

export interface ElevationProps extends HTMLAttributes<HTMLSpanElement> {
}

const Elevation = (props: ElevationProps) => {
  const {
    ...rest
  } = props

  return (
    <span className={'nd-elevation'} {...rest}></span>
  )
}

export default Elevation
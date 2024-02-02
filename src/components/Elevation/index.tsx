import React, {forwardRef, HTMLAttributes, ReactNode, useEffect, useRef} from 'react'
import './Elevation.scss'
import {Simulate} from "react-dom/test-utils";

export interface ElevationProps extends HTMLAttributes<HTMLSpanElement> {
}

const Elevation = (props: ElevationProps) => {
  const {
    ...rest
  } = props

  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.parentElement) {
      ref.current.parentElement.addEventListener('mouseover', () => {
        ref.current!.classList.toggle('hover', true)
      })
      ref.current.parentElement.addEventListener('mouseout', () => {
        ref.current!.classList.toggle('hover', false)
      })
      ref.current.parentElement.addEventListener('mousedown', () => {
        ref.current!.classList.toggle('pressed', true)
      })
      ref.current.parentElement.addEventListener('mouseup', () => {
        ref.current!.classList.toggle('pressed', false)
      })
    }
  }, [ref.current]);

  return (
    <span ref={ref} className={'nd-elevation'} {...rest}></span>
  )
}

export default Elevation
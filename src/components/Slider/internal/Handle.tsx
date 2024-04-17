import React, {forwardRef, HTMLAttributes, ReactNode, MouseEvent, useState} from 'react'
import Elevation from "../../Elevation";
import c from 'classnames'

export interface HandleProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  position?: number
  label?: string
}

const Handle = forwardRef<HTMLDivElement, HandleProps>((props, ref) => {
  const {
    children,
    position = 0,
    className,
    style,
    label,
    ...rest
  } = props


  return (
    <div
      ref={ref}
      className={c(`handle-container`, className)}
      style={{insetInlineStart: `${position}px`, ...style}}
      {...rest}
    >
      <div className={'handle'}>
        <Elevation></Elevation>
        <div className={'label'}>{label}</div>
        <div className={'handle-touch'}></div>
        {children}
      </div>
    </div>
  )
})

export default Handle;
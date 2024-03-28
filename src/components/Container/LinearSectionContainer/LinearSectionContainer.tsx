import React, {forwardRef, HTMLAttributes, ReactNode} from 'react'
import './LinearSectionContainer.scss'
import c from 'classnames'
import {BaseProps} from "../../internal/common/BaseProps";

export interface LinearSectionContainerProps extends BaseProps {
  children?: ReactNode
  start?: ReactNode
  end?: ReactNode
}

const LinearSectionContainer = forwardRef<HTMLDivElement, LinearSectionContainerProps>((props, ref) => {
  const {
    children,
    start,
    end,
    className,
    ...rest
  } = props

  return (
    <div ref={ref} className={c('lsc', className)} {...rest}>
      {start && <div className={'lsc__start'}>{start}</div>}
      <div className={'lsc__middle'}>{children}</div>
      {end && <div className={'lsc__end'}>{end}</div>}
    </div>
  )
})

export default LinearSectionContainer
import React, {forwardRef, ReactNode} from 'react'
import {ButtonProps} from "./content/Button";
import './IconButton.scss'
import c from 'classnames'
import Wrapper, {WrapperHandle, WrapperProps} from "./Wrapper";

export interface IconButtonProps extends ButtonProps, WrapperProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

export interface IconButtonHandle extends WrapperHandle {

}

const IconButton = forwardRef<IconButtonHandle, IconButtonProps>((props, ref) => {
  const {
    children,
    className,
    icon,
    ...rest
  } = props

  return (
    <Wrapper ref={ref} className={c('nd-icon-button', className)} icon={children || icon} {...rest}></Wrapper>
  )
})

export default IconButton
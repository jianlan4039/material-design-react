import React, {forwardRef, ReactNode} from 'react'
import {ButtonProps} from "./internal/Button";
import './IconButton.scss'
import c from 'classnames'
import Container, {WrapperHandle, WrapperProps} from "./Container";

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
    <Container ref={ref} className={c('nd-icon-button', className)} icon={children || icon} {...rest}></Container>
  )
})

export default IconButton
import React, {forwardRef, ReactNode, MouseEvent} from 'react'
import {ButtonProps} from "./content/Button";
import './IconButton.scss'
import c from 'classnames'
import Wrapper, {WrapperProps} from "./Wrapper";

export interface IconButtonProps extends ButtonProps, WrapperProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const {
    children,
    className,
    icon,
    ...rest
  } = props

  return (
    <Wrapper className={c('nd-icon-button', className)} icon={children || icon} {...rest}></Wrapper>
  )
})

export default IconButton
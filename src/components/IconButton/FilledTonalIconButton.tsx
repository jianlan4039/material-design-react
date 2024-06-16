import React, {forwardRef, ReactNode} from 'react'
import {ButtonProps} from "./content/Button";
import './FilledTonalIconButton.scss'
import classNames from "classnames";
import Wrapper, {WrapperProps} from "./Wrapper";

export interface FilledTonalIconButtonProps extends ButtonProps, WrapperProps{
  children?: ReactNode
}

const FilledTonalIconButton = forwardRef<HTMLButtonElement, FilledTonalIconButtonProps>((props, ref) => {
  const {
    children,
    className,
    icon,
    ...rest
  } = props

  return (
    <Wrapper className={classNames('nd-filled-tonal-icon-button', className)} icon={children || icon} {...rest}></Wrapper>
  )
})

export default FilledTonalIconButton
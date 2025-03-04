import React, {forwardRef, ReactNode} from 'react'
import {ButtonProps} from "./internal/Button";
import './FilledTonalIconButton.scss'
import classNames from "classnames";
import Container, {WrapperHandle, WrapperProps} from "./Container";

export interface FilledTonalIconButtonProps extends ButtonProps, WrapperProps{
  children?: ReactNode
}

export interface FilledTonalIconButtonHandle extends WrapperHandle {

}

const FilledTonalIconButton = forwardRef<FilledTonalIconButtonHandle, FilledTonalIconButtonProps>((props, ref) => {
  const {
    children,
    className,
    icon,
    ...rest
  } = props

  return (
    <Container ref={ref} className={classNames('nd-filled-tonal-icon-button', className)} icon={children || icon} {...rest}></Container>
  )
})

export default FilledTonalIconButton
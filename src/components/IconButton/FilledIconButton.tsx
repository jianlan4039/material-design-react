import React, {forwardRef, ReactNode} from 'react'
import {ButtonProps} from "./content/Button";
import Wrapper, {WrapperHandle, WrapperProps} from "./Wrapper";
import classNames from "classnames";
import './FilledIconButton.scss';

export interface FilledIconButtonProps extends ButtonProps, WrapperProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

export interface FilledIconButtonHandle extends WrapperHandle {
}

const FilledIconButton = forwardRef<FilledIconButtonHandle, FilledIconButtonProps>((props, ref) => {
  const {
    children,
    className,
    icon,
    ...rest
  } = props

  return (
    <Wrapper
      ref={ref}
      className={classNames('nd-filled-icon-button', className)}
      icon={children || icon}
      {...rest}
    ></Wrapper>
  )
})

export default FilledIconButton
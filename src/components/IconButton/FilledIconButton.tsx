import React, {forwardRef, ReactNode} from 'react'
import {ButtonProps} from "./content/Button";
import Wrapper, {WrapperProps} from "./Wrapper";
import classNames from "classnames";
import './FilledIconButton.scss';

export interface FilledIconButtonProps extends ButtonProps, WrapperProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

const FilledIconButton = forwardRef<HTMLButtonElement, FilledIconButtonProps>((props, ref) => {
  const {
    children,
    className,
    icon,
    ...rest
  } = props

  return (
    <Wrapper
      className={classNames('nd-filled-icon-button', className)}
      icon={children || icon}
      {...rest}
    ></Wrapper>
  )
})

export default FilledIconButton
import React, {forwardRef, ReactNode} from 'react'
import {ButtonProps} from "./content/Button";
import './OutlinedIconButton.scss'
import Outline from "../Outline/Outline";
import Wrapper, {WrapperProps} from "./Wrapper";
import classNames from "classnames";

export interface OutlinedIconButtonProps extends ButtonProps, WrapperProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

const OutlinedIconButton = forwardRef<HTMLButtonElement, OutlinedIconButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    className,
    icon,
    ...rest
  } = props

  return (
    <Wrapper
      className={classNames('nd-outlined-icon-button', className)}
      icon={children || icon}
      disabled={disabled}
      {...rest}
    >
      <Outline disabled={disabled}></Outline>
    </Wrapper>
  )
})

export default OutlinedIconButton
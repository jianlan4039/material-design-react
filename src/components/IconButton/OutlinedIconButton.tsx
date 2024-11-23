import React, {forwardRef, ReactNode} from 'react'
import {ButtonProps} from "./internal/Button";
import './OutlinedIconButton.scss'
import Outline from "../Outline/Outline";
import Wrapper, {WrapperHandle, WrapperProps} from "./Wrapper";
import classNames from "classnames";

export interface OutlinedIconButtonProps extends ButtonProps, WrapperProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

export interface OutlinedIconButtonHandle extends WrapperHandle {

}

const OutlinedIconButton = forwardRef<OutlinedIconButtonHandle, OutlinedIconButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    className,
    icon,
    ...rest
  } = props

  return (
    <Wrapper
      ref={ref}
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
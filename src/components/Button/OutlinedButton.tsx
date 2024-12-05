import React, {forwardRef} from 'react'
import {ButtonProps} from "./internal/Button";
import Outline from "../Outline/Outline";
import CommonButton, {ButtonHandle} from "./CommonButton";
import './OutlinedButton.scss'

export interface OutlinedButtonProps extends ButtonProps {
}

export interface OutlinedButtonHandle extends ButtonHandle {
}


const OutlinedButton = forwardRef<OutlinedButtonHandle, OutlinedButtonProps>((
  {
    label,
    children,
    disabled,
    ...rest
  }, ref) => {

  return (
    <CommonButton ref={ref} name={'nd-outlined-button'} label={label || children} disabled={disabled} {...rest}>
      <Outline disabled={disabled}></Outline>
    </CommonButton>
  )
})

export default OutlinedButton
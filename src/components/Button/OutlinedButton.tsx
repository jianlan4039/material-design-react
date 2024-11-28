import React, {forwardRef} from 'react'
import {ButtonProps} from "./internal/Button";
import Outline from "../Outline/Outline";
import Wrapper, {ButtonHandle} from "./Wrapper";
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
    <Wrapper ref={ref} name={'nd-outlined-button'} label={label || children} disabled={disabled} {...rest}>
      <Outline disabled={disabled}></Outline>
    </Wrapper>
  )
})

export default OutlinedButton
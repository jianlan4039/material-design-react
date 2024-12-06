import React, {forwardRef} from 'react'
import {ButtonProps} from "./internal/Button";
import CommonButton, {ButtonHandle} from "./CommonButton";
import './OutlinedButton.scss'

export interface OutlinedButtonProps extends ButtonProps {
}

export interface OutlinedButtonHandle extends ButtonHandle {
}

/**
 * Outlined Button is one of common buttons in Material Design 3.
 */
const OutlinedButton = forwardRef<OutlinedButtonHandle, OutlinedButtonProps>((
  props, ref) => {

  return (
    <CommonButton ref={ref} variant={'outlined'} {...props}></CommonButton>
  )
})

export default OutlinedButton
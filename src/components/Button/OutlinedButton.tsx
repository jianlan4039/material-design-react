import React, {forwardRef} from 'react'
import {ButtonProps} from "./internal/Button";
import Button, {ButtonHandle} from "./Button";
import './OutlinedButton.scss'

export interface OutlinedButtonProps extends ButtonProps {
}

export interface OutlinedButtonHandle extends ButtonHandle {
}

/**
 * Outlined Button is one of common button in Material Design 3.
 */
const OutlinedButton = forwardRef<OutlinedButtonHandle, OutlinedButtonProps>((
  props, ref) => {

  return (
    <Button ref={ref} variant={'outlined'} {...props}></Button>
  )
})

export default OutlinedButton
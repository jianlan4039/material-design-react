import React, {forwardRef} from 'react'
import {ButtonProps} from "./internal/Button";
import Button, {ButtonHandle} from "./Button";
import './TextButton.scss'

export interface TextButtonProps extends ButtonProps {
}

export interface TextButtonHandle extends ButtonHandle {
}

/**
 * Text Button is one of common button in Material Design 3.
 */
const TextButton = forwardRef<TextButtonHandle, TextButtonProps>((props, ref) => {
  return (
    <Button ref={ref} variant={"text"} {...props}></Button>
  )
})

export default TextButton

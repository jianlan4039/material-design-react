import React, {forwardRef} from 'react'
import {ButtonProps} from "./internal/Button";
import CommonButton, {ButtonHandle} from "./CommonButton";
import './TextButton.scss'

export interface TextButtonProps extends ButtonProps {
}

export interface TextButtonHandle extends ButtonHandle {
}

/**
 * Text Button is one of common buttons in Material Design 3.
 */
const TextButton = forwardRef<TextButtonHandle, TextButtonProps>((props, ref) => {
  return (
    <CommonButton ref={ref} variant={"text"} {...props}></CommonButton>
  )
})

export default TextButton

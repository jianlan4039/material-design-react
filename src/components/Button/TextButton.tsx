import React, {forwardRef} from 'react'
import {ButtonProps} from "./internal/Button";
import CommonButton, {ButtonHandle} from "./CommonButton";
import './TextButton.scss'

export interface TextButtonProps extends ButtonProps {
}

export interface TextButtonHandle extends ButtonHandle {
}

const TextButton = forwardRef<TextButtonHandle, TextButtonProps>(({label, children, ...rest}, ref) => {
  return (
    <CommonButton ref={ref} name={'nd-text-button'} label={label || children} {...rest}></CommonButton>
  )
})

export default TextButton

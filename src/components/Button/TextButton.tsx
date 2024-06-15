import React, {forwardRef} from 'react'
import {ButtonProps} from "./internal/Button";
import Wrapper, {ButtonHandle} from "./Wrapper";
import './TextButton.scss'

export interface TextButtonProps extends ButtonProps {
}

export interface TextButtonHandle extends ButtonHandle {
}

const TextButton = forwardRef<TextButtonHandle, TextButtonProps>(({label, children, ...rest}, ref) => {
  return (
    <Wrapper ref={ref} name={'nd-text-button'} label={label || children} {...rest}></Wrapper>
  )
})

export default TextButton

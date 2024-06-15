import React, {forwardRef} from 'react'
import {ButtonProps} from "./internal/Button";
import Wrapper, {ButtonHandle} from "./Wrapper";
import './FilledTonalButton.scss'

export interface FilledTonalButtonProps extends ButtonProps {
}

export interface FilledTonalButtonHandle extends ButtonHandle {
}

const FilledTonalButton = forwardRef<FilledTonalButtonHandle, FilledTonalButtonProps>(({label, children, ...rest}, ref) => {
  return (
    <Wrapper ref={ref} name={'nd-filled-tonal-button'} label={label || children} {...rest}></Wrapper>
  )
})

export default FilledTonalButton
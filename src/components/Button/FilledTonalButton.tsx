import React, {forwardRef} from 'react'
import {ButtonProps} from "./internal/Button";
import Button, {ButtonHandle} from "./Button";
import './FilledTonalButton.scss'

export interface FilledTonalButtonProps extends ButtonProps {
}

export interface FilledTonalButtonHandle extends ButtonHandle {
}

const FilledTonalButton = forwardRef<FilledTonalButtonHandle, FilledTonalButtonProps>((props, ref) => {
  return (
    <Button ref={ref} variant={"filled-tonal"} {...props}></Button>
  )
})

export default FilledTonalButton
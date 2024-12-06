import React, {forwardRef} from 'react'
import {ButtonProps} from "./internal/Button";
import CommonButton, {ButtonHandle} from "./CommonButton";
import './FilledTonalButton.scss'

export interface FilledTonalButtonProps extends ButtonProps {
}

export interface FilledTonalButtonHandle extends ButtonHandle {
}

const FilledTonalButton = forwardRef<FilledTonalButtonHandle, FilledTonalButtonProps>((props, ref) => {
  return (
    <CommonButton ref={ref} variant={"filled-tonal"} {...props}></CommonButton>
  )
})

export default FilledTonalButton
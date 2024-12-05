import React, {forwardRef} from 'react'
import {ButtonProps} from "./internal/Button";
import CommonButton, {ButtonHandle} from "./CommonButton";
import './FilledTonalButton.scss'
import Elevation from "../Elevation";

export interface FilledTonalButtonProps extends ButtonProps {
}

export interface FilledTonalButtonHandle extends ButtonHandle {
}

const FilledTonalButton = forwardRef<FilledTonalButtonHandle, FilledTonalButtonProps>(({label, children, ...rest}, ref) => {
  return (
    <CommonButton ref={ref} name={'nd-filled-tonal-button'} label={label || children} {...rest}>
      <Elevation></Elevation>
    </CommonButton>
  )
})

export default FilledTonalButton
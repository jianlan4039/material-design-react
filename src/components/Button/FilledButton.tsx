import React, {forwardRef} from 'react';
import {ButtonProps} from "./internal/Button";
import CommonButton, {ButtonHandle} from "./CommonButton";
import './FilledButton.scss';

export interface FilledButtonProps extends ButtonProps {}

export interface FilledButtonHandle extends ButtonHandle {}

/**
 * Filled button is one of the common button in Material Design 3.
 */
const FilledButton = forwardRef<FilledButtonHandle, FilledButtonProps>((props, ref) => {
  return (
    <CommonButton ref={ref} variant={"filled"} {...props}></CommonButton>
  )
})

export default FilledButton
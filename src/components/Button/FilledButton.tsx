import React, {forwardRef} from 'react';
import {ButtonProps} from "./internal/Button";
import CommonButton, {ButtonHandle} from "./CommonButton";
import Elevation from "../Elevation";
import './FilledButton.scss';

export interface FilledButtonProps extends ButtonProps {}

export interface FilledButtonHandle extends ButtonHandle {}

const FilledButton = forwardRef<FilledButtonHandle, FilledButtonProps>(({label, children, ...rest}, ref) => {
  return (
    <CommonButton ref={ref} name={'nd-filled-button'} label={label || children} {...rest}>
      <Elevation></Elevation>
    </CommonButton>
  )
})

export default FilledButton
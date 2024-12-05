import React, {forwardRef} from 'react';
import {ButtonProps} from "./internal/Button";
import CommonButton, {ButtonHandle} from "./CommonButton";
import './ElevatedButton.scss';
import Elevation from "../Elevation";

export interface ElevatedButtonProps extends ButtonProps {
}

export interface ElevatedButtonHandle extends ButtonHandle {
}

const ElevatedButton = forwardRef<ElevatedButtonHandle, ElevatedButtonProps>((
  {
    name,
    children,
    label,
    ...rest
  },
  ref) => {

  return (
    <CommonButton ref={ref} name={'nd-elevated-button'} label={label || children} {...rest}>
      <Elevation></Elevation>
    </CommonButton>
  )
})

export default ElevatedButton
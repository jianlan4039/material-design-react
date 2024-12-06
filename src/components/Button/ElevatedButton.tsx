import React, {forwardRef} from 'react';
import {ButtonProps} from "./internal/Button";
import CommonButton, {ButtonHandle} from "./CommonButton";
import './ElevatedButton.scss';

export interface ElevatedButtonProps extends ButtonProps {
}

export interface ElevatedButtonHandle extends ButtonHandle {
}

/**
 * Elevated Button is one of the common buttons.
 */
const ElevatedButton = forwardRef<ElevatedButtonHandle, ElevatedButtonProps>((
  {
    ...rest
  },
  ref) => {

  return (
    <CommonButton
      ref={ref}
      variant={'elevated'}
      {...rest}
    ></CommonButton>
  )
})

export default ElevatedButton
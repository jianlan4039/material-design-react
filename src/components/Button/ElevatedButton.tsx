import React, {forwardRef} from 'react';
import {ButtonProps} from "./internal/Button";
import Button, {ButtonHandle} from "./Button";
import './ElevatedButton.scss';

export interface ElevatedButtonProps extends ButtonProps {
}

export interface ElevatedButtonHandle extends ButtonHandle {
}

/**
 * Elevated Button is one of the common button.
 */
const ElevatedButton = forwardRef<ElevatedButtonHandle, ElevatedButtonProps>((props, ref) => {

  return (
    <Button
      ref={ref}
      variant={'elevated'}
      {...props}
    ></Button>
  )
})

export default ElevatedButton
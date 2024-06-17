import React, {forwardRef} from 'react';
import {ButtonProps} from "./internal/Button";
import Wrapper, {ButtonHandle} from "./Wrapper";
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
    <Wrapper ref={ref} name={'nd-elevated-button'} label={label || children} {...rest}>
      <Elevation></Elevation>
    </Wrapper>
  )
})

export default ElevatedButton
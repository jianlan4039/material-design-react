import React, {forwardRef} from 'react';
import {ButtonProps} from "./internal/Button";
import Wrapper, {ButtonHandle} from "./Wrapper";
import './FilledButton.scss';
import Elevation from "../Elevation";

export interface FilledButtonProps extends ButtonProps {
}

export interface FilledButtonHandle extends ButtonHandle {
}

const FilledButton = forwardRef<FilledButtonHandle, FilledButtonProps>(({label, children, ...rest}, ref) => {
  return (
    <Wrapper ref={ref} name={'nd-filled-button'} label={label || children} {...rest}>
      <Elevation></Elevation>
    </Wrapper>
  )
})

export default FilledButton
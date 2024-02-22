import React, {ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './FilledTonalIconButton.scss'
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";

export interface FilledTonalIconButtonProps extends ButtonProps {
  children?: ReactNode
}

export default function FilledTonalIconButton(props: FilledTonalIconButtonProps) {
  const {
    children,
    disabled,
    ...rest
  } = props

  return (
    <div className={'nd-filled-tonal-icon-button'}>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      <StateLayer disabled={disabled}></StateLayer>
      <Button {...rest}>
        {children}
      </Button>
    </div>
  )
}
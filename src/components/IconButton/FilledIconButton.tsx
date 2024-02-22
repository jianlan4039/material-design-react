import React, {ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './FilledIconButton.scss'
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";

export interface FilledIconButtonProps extends ButtonProps {
  children?: ReactNode
}

export default function FilledIconButton(props: FilledIconButtonProps) {
  const {
    children,
    disabled,
    ...rest
  } = props

  return (
    <div className={'nd-filled-icon-button'}>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      <StateLayer disabled={disabled}></StateLayer>
      <Button {...rest}>
        {children}
      </Button>
    </div>
  )
}
import React, {ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './IconButton.scss'
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";

export interface IconButtonProps extends ButtonProps {
  children?: ReactNode
}

export default function IconButton(props: IconButtonProps) {
  const {
    children,
    disabled,
    ...rest
  } = props

  return (
    <div className={'nd-icon-button'}>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      <StateLayer disabled={disabled}></StateLayer>
      <Button {...rest}>
        {children}
      </Button>
    </div>
  )
}
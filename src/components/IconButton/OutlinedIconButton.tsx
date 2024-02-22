import React, {ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './OutlinedIconButton.scss'
import Outline from "../Outline/Outline";
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";

export interface OutlinedIconButtonProps extends ButtonProps {
  children?: ReactNode
}

export default function OutlinedIconButton(props: OutlinedIconButtonProps) {
  const {
    children,
    disabled,
    ...rest
  } = props

  return (
    <div className={'nd-outlined-icon-button'}>
      <Outline disabled={disabled}></Outline>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      <StateLayer disabled={disabled}></StateLayer>
      <Button disabled={disabled} {...rest}>
        {children}
      </Button>
    </div>
  )
}
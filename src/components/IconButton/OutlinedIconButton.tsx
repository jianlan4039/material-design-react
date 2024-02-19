import React, {ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './OutlinedIconButton.scss'
import Outline from "../Outline/Outline";

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
      <Button disabled={disabled} {...rest}>
        {children}
      </Button>
    </div>
  )
}
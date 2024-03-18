import React, {ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './OutlinedIconButton.scss'
import Outline from "../Outline/Outline";
import IconButtonContainer from "./IconButtonContainer";

export interface OutlinedIconButtonProps extends ButtonProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

export default function OutlinedIconButton(props: OutlinedIconButtonProps) {
  const {
    children,
    disabled,
    selected,
    toggled,
    ...rest
  } = props

  return (
    <IconButtonContainer className={'nd-outlined-icon-button'} toggled={toggled} selected={selected}>
      <Outline disabled={disabled}></Outline>
      <Button disabled={disabled} {...rest}>
        {children}
      </Button>
    </IconButtonContainer>
  )
}
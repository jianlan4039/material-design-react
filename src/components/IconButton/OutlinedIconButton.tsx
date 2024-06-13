import React, {forwardRef, ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './OutlinedIconButton.scss'
import Outline from "../Outline/Outline";
import IconButtonContainer from "./IconButtonContainer";
import withFocusRing from "../Focus";

export interface OutlinedIconButtonProps extends ButtonProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

const OutlinedIconButton = withFocusRing(forwardRef<HTMLButtonElement, OutlinedIconButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    selected,
    toggled,
    focusRing,
    ...rest
  } = props

  return (
    <IconButtonContainer className={'nd-outlined-icon-button'} toggled={toggled} selected={selected} focusRing={focusRing}>
      <Outline disabled={disabled}></Outline>
      <Button ref={ref} disabled={disabled} {...rest}>
        {children}
      </Button>
    </IconButtonContainer>
  )
}))

export default OutlinedIconButton
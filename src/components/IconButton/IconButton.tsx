import React, {ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './IconButton.scss'
import IconButtonContainer from "./IconButtonContainer";

export interface IconButtonProps extends ButtonProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

export default function IconButton(props: IconButtonProps) {
  const {
    children,
    disabled,
    toggled,
    selected,
    ...rest
  } = props

  return (
    <IconButtonContainer className={'nd-icon-button'} toggled={toggled} selected={selected}>
      <Button {...rest}>
        {children}
      </Button>
    </IconButtonContainer>
  )
}
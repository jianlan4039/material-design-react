import React, {ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './FilledTonalIconButton.scss'
import IconButtonContainer from "./IconButtonContainer";

export interface FilledTonalIconButtonProps extends ButtonProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

export default function FilledTonalIconButton(props: FilledTonalIconButtonProps) {
  const {
    children,
    disabled,
    toggled,
    selected,
    ...rest
  } = props

  return (
    <IconButtonContainer className={'nd-filled-tonal-icon-button'} toggled={toggled} selected={selected}>
      <Button {...rest}>
        {children}
      </Button>
    </IconButtonContainer>
  )
}
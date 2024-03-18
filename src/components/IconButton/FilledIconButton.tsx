import React, {ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './FilledIconButton.scss'
import IconButtonContainer from "./IconButtonContainer";

export interface FilledIconButtonProps extends ButtonProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

export default function FilledIconButton(props: FilledIconButtonProps) {
  const {
    children,
    disabled,
    toggled,
    selected,
    ...rest
  } = props

  return (
    <IconButtonContainer className={'nd-filled-icon-button'} toggled={toggled} selected={selected}>
      <Button disabled={disabled} {...rest}>
        {children}
      </Button>
    </IconButtonContainer>
  )
}
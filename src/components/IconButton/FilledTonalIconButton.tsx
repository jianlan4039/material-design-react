import React, {forwardRef, ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './FilledTonalIconButton.scss'
import IconButtonContainer from "./IconButtonContainer";
import withFocusRing from "../Focus";

export interface FilledTonalIconButtonProps extends ButtonProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

const FilledTonalIconButton = withFocusRing(forwardRef<HTMLButtonElement, FilledTonalIconButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    toggled,
    selected,
    focusRing,
    ...rest
  } = props

  return (
    <IconButtonContainer className={'nd-filled-tonal-icon-button'} toggled={toggled} selected={selected} focusRing={focusRing}>
      <Button ref={ref} {...rest}>
        {children}
      </Button>
    </IconButtonContainer>
  )
}))

export default FilledTonalIconButton
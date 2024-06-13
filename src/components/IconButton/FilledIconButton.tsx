import React, {forwardRef, ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import IconButtonContainer from "./IconButtonContainer";
import './FilledIconButton.scss'
import withFocusRing from "../Focus";

export interface FilledIconButtonProps extends ButtonProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

const FilledIconButton = withFocusRing(forwardRef<HTMLButtonElement, FilledIconButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    toggled,
    selected,
    focusRing,
    ...rest
  } = props

  return (
    <IconButtonContainer className={'nd-filled-icon-button'} toggled={toggled} selected={selected} focusRing={focusRing}>
      <Button ref={ref} disabled={disabled} {...rest}>
        {children}
      </Button>
    </IconButtonContainer>
  )
}))

export default FilledIconButton
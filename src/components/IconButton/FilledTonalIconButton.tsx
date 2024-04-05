import React, {forwardRef, ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './FilledTonalIconButton.scss'
import IconButtonContainer from "./IconButtonContainer";

export interface FilledTonalIconButtonProps extends ButtonProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

const FilledTonalIconButton = forwardRef<HTMLButtonElement, FilledTonalIconButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    toggled,
    selected,
    ...rest
  } = props

  return (
    <IconButtonContainer className={'nd-filled-tonal-icon-button'} toggled={toggled} selected={selected}>
      <Button ref={ref} {...rest}>
        {children}
      </Button>
    </IconButtonContainer>
  )
})

export default FilledTonalIconButton
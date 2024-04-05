import React, {forwardRef, ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import IconButtonContainer from "./IconButtonContainer";
import './FilledIconButton.scss'

export interface FilledIconButtonProps extends ButtonProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

const FilledIconButton = forwardRef<HTMLButtonElement, FilledIconButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    toggled,
    selected,
    ...rest
  } = props

  return (
    <IconButtonContainer className={'nd-filled-icon-button'} toggled={toggled} selected={selected}>
      <Button ref={ref} disabled={disabled} {...rest}>
        {children}
      </Button>
    </IconButtonContainer>
  )
})

export default FilledIconButton
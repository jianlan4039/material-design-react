import React, {forwardRef, ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './IconButton.scss'
import IconButtonContainer from "./IconButtonContainer";

export interface IconButtonProps extends ButtonProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    toggled,
    selected,
    ...rest
  } = props

  return (
    <IconButtonContainer className={'nd-icon-button'} toggled={toggled} selected={selected}>
      <Button ref={ref} {...rest}>
        {children}
      </Button>
    </IconButtonContainer>
  )
})

export default IconButton
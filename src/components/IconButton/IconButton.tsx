import React, {ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './IconButton.scss'

export interface IconButtonProps extends ButtonProps {
  children?: ReactNode
}

export default function IconButton(props: IconButtonProps) {
  const {
    children,
    ...rest
  } = props

  return (
    <div className={'nd-icon-button'}>
      <Button {...rest}>
        {children}
      </Button>
    </div>
  )
}
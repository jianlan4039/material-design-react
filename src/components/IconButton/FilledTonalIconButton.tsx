import React, {ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './FilledTonalIconButton.scss'

export interface FilledTonalIconButtonProps extends ButtonProps {
  children?: ReactNode
}

export default function FilledTonalIconButton(props: FilledTonalIconButtonProps) {
  const {
    children,
    ...rest
  } = props

  return (
    <div className={'nd-filled-tonal-icon-button'}>
      <Button {...rest}>
        {children}
      </Button>
    </div>
  )
}
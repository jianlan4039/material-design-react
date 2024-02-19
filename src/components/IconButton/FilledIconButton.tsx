import React, {ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './FilledIconButton.scss'

export interface FilledIconButtonProps extends ButtonProps {
  children?: ReactNode
}

export default function FilledIconButton(props: FilledIconButtonProps) {
  const {
    children,
    ...rest
  } = props

  return (
    <div className={'nd-filled-icon-button'}>
      <Button {...rest}>
        {children}
      </Button>
    </div>
  )
}
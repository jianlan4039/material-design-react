import React, {forwardRef, ReactNode} from 'react'
import './FilledTextField.scss'
import StateLayer from "../StateLayer";
import FilledField, {FilledFieldProps} from "./content/FilledField";
import c from 'classnames'

export interface FilledTextFieldContentProps extends FilledFieldProps {
  children?: ReactNode
}

const FilledTextField = forwardRef<HTMLInputElement, FilledTextFieldContentProps>((props, ref) => {
  const {
    children,
    error,
    disabled,
    supportingText,
    ...rest
  } = props

  return (
    <div
      className={c('nd-filled-text-field', {
        'error': error,
        'disabled': disabled,
        'with-supporting-text': supportingText
      })}
    >
      <StateLayer disabled={disabled}></StateLayer>
      <FilledField error={error} disabled={disabled} supportingText={supportingText} {...rest}></FilledField>
    </div>
  )
})

export default FilledTextField
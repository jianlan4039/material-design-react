import React, {ReactNode} from 'react'
import OutlinedField, {OutlinedFieldProps} from "./content/OutlinedField";
import StateLayer from "../StateLayer";
import './OutlinedTextField.scss'

export interface OutlinedTextFieldProps extends OutlinedFieldProps{
  children?: ReactNode
}

export default function OutlinedTextField(props: OutlinedTextFieldProps) {
  const {
    children,
    ...rest
  } = props

  return (
    <div className={'nd-outlined-text-field'}>
      <OutlinedField {...rest}></OutlinedField>
    </div>
  )
}
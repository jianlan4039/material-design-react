import React, {forwardRef, ReactNode} from 'react'
import './FilledTextField.scss'
import StateLayer from "../StateLayer";
import FilledField, {FilledFieldProps} from "./content/FilledField";

export interface FilledTextFieldContentProps extends FilledFieldProps{
  children?: ReactNode
}

const FilledTextField = forwardRef<HTMLInputElement, FilledTextFieldContentProps>((props, ref) => {
  const {
    children,
    ...rest
  } = props

  return (
    <div className={'nd-filled-text-field'}>
      {/*<StateLayer></StateLayer>*/}
      <FilledField {...rest}></FilledField>
    </div>
  )
})

export default FilledTextField
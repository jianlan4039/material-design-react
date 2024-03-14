import React, {InputHTMLAttributes, ReactNode, useState} from 'react'
import FilledField from "../../Field/FilledField";
import './FilledTextField.scss'

export interface FilledTextFieldProps extends InputHTMLAttributes<HTMLInputElement>{
  children?: ReactNode
  prefix?: string
  suffix?: string
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  supportingText?: string
  label?: string
}

export default function FilledTextField(props: FilledTextFieldProps) {
  const {
    children,
    prefix,
    suffix,
    leadingIcon,
    trailingIcon,
    supportingText,
    label,
    ...rest
  } = props

  const [populated, setPopulated] = useState(false)

  const rootClickHandler = () => {
    setPopulated(!populated)
  }

  return (
    <div className={'nd-filled-text-field'} onClick={rootClickHandler}>
      <FilledField start={leadingIcon} end={trailingIcon} label={label} populated={populated}>
        <div className={'nd-input-wrapper'}>
          {prefix && <span>{prefix}</span>}
          <input type="text"/>
          {suffix && <span>{suffix}</span>}
        </div>
      </FilledField>
    </div>
  )
}
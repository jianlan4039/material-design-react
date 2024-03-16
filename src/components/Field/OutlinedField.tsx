import React, {ReactNode} from 'react'
import './OutlinedField.scss'
import c from 'classnames'
import Field, {FieldProps} from "./internal/Field";

export interface OutlinedFieldProps extends FieldProps {
  children?: ReactNode
  focus?: boolean
}

export default function OutlinedField(props: OutlinedFieldProps) {
  const {
    children,
    label,
    focus,
    ...rest
  } = props

  return (
    <div className={'nd-outlined-field'}>
      <div className={c('nd-outlined-field__outline-wrapper', {'indicator-active': focus, 'with-label': label})}>
        <div className={'nd-outline__start'}></div>
        <div className={'nd-outline__notch'}>
          <span className={'nd-outline__panel-inactive'}></span>
          <span className={'nd-outline__panel-active'}></span>
          <span className={'nd-outline__notch__label'}>{label}</span>
        </div>
        <div className={'nd-outline__end'}></div>
      </div>
      <Field label={label} {...rest}>{children}</Field>
    </div>
  )
}
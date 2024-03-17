import React, {ReactNode, useEffect, useRef} from 'react'
import Field, {FieldProps} from "./internal/Field";
import StateLayer from "../StateLayer";
import './FilledField.scss'
import c from 'classnames'

export interface FilledFieldProps extends Omit<FieldProps, "labelWrapper"> {
  children?: ReactNode
  label?: string
  focus?: boolean
}

export default function FilledField(props: FilledFieldProps) {
  const {
    children,
    label,
    className,
    focus,
    ...rest
  } = props

  return (
    <div className={c('nd-filled-field', className, {'with-label': label})}>
      <StateLayer></StateLayer>
      <div className={c('nd-filled-field__indicator', {'active': focus})}></div>
      <Field label={label} {...rest}>
        {children}
      </Field>
    </div>
  )
}
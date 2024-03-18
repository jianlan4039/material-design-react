import React, {ReactNode, useEffect, useRef, useState} from 'react'
import Field, {FieldProps} from "./internal/Field";
import StateLayer from "../StateLayer";
import './FilledField.scss'
import c from 'classnames'

export interface FilledFieldProps extends Omit<FieldProps, "labelWrapper"> {
  children?: ReactNode
  label?: string
  focus?: boolean
  disabled?: boolean,
  error?: boolean
}

export default function FilledField(props: FilledFieldProps) {
  const {
    children,
    label,
    className,
    focus,
    disabled,
    error,
    ...rest
  } = props

  const [hover, setHover] = useState<boolean>(false)

  const mouseOverHandler = () => {
    if (disabled) {
      return
    }
    setHover(true)
  }

  const mouseOutHandler = () => {
    if (disabled) {
      return
    }
    setHover(false)
  }

  return (
    <div
      className={c('nd-filled-field', className, {
        'with-label': label,
        'hover': hover,
        'focus': focus,
        'error': error,
        'disabled': disabled
      })}
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
    >
      <StateLayer disabled={disabled}></StateLayer>
      <div className={c('nd-filled-field__indicator', {'active': focus})}></div>
      <Field label={label} {...rest}>
        {children}
      </Field>
    </div>
  )
}
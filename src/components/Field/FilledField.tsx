import React, {forwardRef, useState} from 'react'
import Field, {FieldProps} from "./internal/Field";
import withStateLayer from "../StateLayer";
import './FilledField.scss'
import c from 'classnames'
import {StateElement} from "../internal/common/StateElement";

export interface FilledFieldProps extends FieldProps, StateElement {
}

const FilledField = withStateLayer<HTMLDivElement, FilledFieldProps>(forwardRef<HTMLDivElement, FilledFieldProps>((props: FilledFieldProps, ref) => {
  const {
    children,
    label,
    className,
    focus,
    disabled,
    error,
    stateLayer,
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
      ref={ref}
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
      {stateLayer}
      <div className={c('nd-filled-field__indicator', {'active': focus})}></div>
      <Field label={label} {...rest}>
        {children}
      </Field>
    </div>
  )
}))

export default FilledField
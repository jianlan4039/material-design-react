import React, {ReactNode, useState} from 'react'
import './OutlinedField.scss'
import c from 'classnames'
import Field, {FieldProps} from "./internal/Field";
import FieldOutline from "./internal/FieldOutline";
import SupportingText from "./internal/SupportingText";

export interface OutlinedFieldProps extends FieldProps {
  children?: ReactNode
  focus?: boolean
  supportingText?: string
  supportingTextTrailing?: string
  error?: boolean
  disabled?: boolean
}

export default function OutlinedField(props: OutlinedFieldProps) {
  const {
    children,
    label,
    focus,
    populated,
    start,
    supportingText,
    supportingTextTrailing,
    error,
    disabled,
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
      className={c('nd-outlined-field', {
        'focus': focus,
        'populated': populated,
        'hover': hover,
        'error': error,
        'disabled': disabled
      })}
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
    >
      <FieldOutline label={label}></FieldOutline>
      <Field
        className={c({'with-leading-icon': start})}
        label={label}
        populated={populated}
        start={start}
        {...rest}
      >
        {children}
      </Field>
      <SupportingText trailing={supportingTextTrailing}>{supportingText}</SupportingText>
    </div>
  )
}
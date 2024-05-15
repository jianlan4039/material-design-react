import React, {forwardRef, useState} from 'react'
import './OutlinedField.scss'
import c from 'classnames'
import Field, {FieldProps} from "./internal/Field";
import FieldOutline from "./internal/FieldOutline";

export interface OutlinedFieldProps extends FieldProps {
  showSupportingText?: boolean
}

const OutlinedField = forwardRef<HTMLDivElement, OutlinedFieldProps>((props, ref) => {
  const {
    children,
    label,
    focus,
    populated,
    icon,
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
      ref={ref}
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
        className={c({'with-leading-icon': icon})}
        label={label}
        populated={populated}
        icon={icon}
        {...rest}
      >
        {children}
      </Field>
    </div>
  )
})

export default OutlinedField
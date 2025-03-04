import React, {forwardRef,} from 'react'
import './OutlinedField.scss'
import c from 'classnames'
import Field, {FieldProps} from "./internal/Field";
import FieldOutline from "./internal/FieldOutline";
import StatefulBox from "../StatefulBox/StatefulBox";

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
    showSupportingText,
    className,
    ...rest
  } = props

  return (
    <StatefulBox
      ref={ref}
      className={c('nd-outlined-field', className, {
        'populated': populated,
        'error': error,
        'show-supporting-text': showSupportingText,
      })}
      disabled={disabled}
      rippleable={false}
    >
      <FieldOutline label={label}></FieldOutline>
      <Field
        className={c({'with-leading-icon': icon})}
        label={label}
        populated={populated}
        icon={icon}
        showSupportingText={showSupportingText}
        {...rest}
      >
        {children}
      </Field>
    </StatefulBox>
  )
})

export default OutlinedField
import {forwardRef} from 'react'
import Field, {FieldProps} from "./internal/Field";
import './FilledField.scss'
import c from 'classnames'
import StatefulBox from "../StatefulBox/StatefulBox";

export interface FilledFieldProps extends FieldProps {
}

const FilledField = forwardRef<HTMLDivElement, FilledFieldProps>((props: FilledFieldProps, ref) => {
  const {
    children,
    label,
    className,
    focus,
    disabled,
    error,
    showSupportingText,
    ...rest
  } = props

  return (
    <StatefulBox
      ref={ref}
      className={c('nd-filled-field', className, {
        'with-label': label,
        'error': error,
        'show-supporting-text': showSupportingText
      })}
    >
      <div className={c('nd-filled-field__indicator', {'active': focus})}></div>
      <Field label={label} showSupportingText={showSupportingText} {...rest}>
        {children}
      </Field>
    </StatefulBox>
  )
})

export default FilledField
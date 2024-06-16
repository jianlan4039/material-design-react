import React, {forwardRef, useState, MouseEvent} from 'react'
import Field, {FieldProps} from "./internal/Field";
import './FilledField.scss'
import c from 'classnames'
import useRipple from "../Ripple/useRipple";

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
    ...rest
  } = props

  const [hover, setHover] = useState<boolean>(false)

  const [rippleProps, ripple] = useRipple<HTMLDivElement>({
    onMouseOver: mouseOverHandler,
    onMouseOut: mouseOutHandler,
  })

  function mouseOverHandler(e: MouseEvent<HTMLDivElement>) {
    if (disabled) return;
    setHover(true)
  }

  function mouseOutHandler(e: MouseEvent<HTMLDivElement>) {
    if (disabled) return;
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
      {...rippleProps}
    >
      {ripple}
      <div className={c('nd-filled-field__indicator', {'active': focus})}></div>
      <Field label={label} {...rest}>
        {children}
      </Field>
    </div>
  )
})

export default FilledField
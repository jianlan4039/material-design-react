import React, {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  MouseEvent,
  useImperativeHandle
} from 'react'
import c from 'classnames'

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode
  leading?: ReactNode
  trailing?: ReactNode
  prefix?: string
  suffix?: string
  focus?: boolean
}

export interface FieldRefProps {
  rootRef: () => HTMLDivElement | null
  inputRef: () => HTMLInputElement | null
}

const Field = forwardRef<FieldRefProps, FieldProps>((props, ref) => {
  const {
    leading,
    trailing,
    prefix,
    suffix,
    type,
    children,
    focus,
    className,
    onClick,
    onMouseDown,
    ...rest
  } = props

  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const clickHandler = (e: MouseEvent<HTMLInputElement>) => {
    onClick?.(e)
    e.stopPropagation()
  }

  const mouseDownHandler = (e: MouseEvent<HTMLInputElement>) => {
    onMouseDown?.(e)
    e.stopPropagation()
  }

  useImperativeHandle(ref, () => ({
    rootRef: () => rootRef.current,
    inputRef: () => inputRef.current
  }))

  useEffect(() => {
    if (inputRef.current && focus) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [inputRef, focus]);

  return (
    <div ref={rootRef} className={c('nd-field', className, {'with-leading': leading, 'with-trailing': trailing})}>
      <span className={'nd-field__leading'}>{leading}</span>
      <div className={c('nd-field__input-wrapper', {'with-prefix': prefix, 'with-suffix': suffix})}>
        <span className={'nd-field__input-wrapper__prefix'}>{prefix}</span>
        <input
          ref={inputRef}
          className={'nd-field__input-wrapper__input'}
          type={type}
          onClick={clickHandler}
          onMouseDown={mouseDownHandler}
          {...rest}
        />
        <span className={'nd-field__input-wrapper__suffix'}>{suffix}</span>
      </div>
      <span className={'nd-field__trailing'}>{trailing}</span>
      {children}
    </div>
  )
})

export default Field
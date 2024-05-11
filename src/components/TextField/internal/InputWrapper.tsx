import React, {forwardRef, InputHTMLAttributes, ReactNode, useState, useEffect} from 'react'
import './InputWrapper.scss'

export interface InputWrapperProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode
  prefix?: string
  suffix?: string
}

const InputWrapper = forwardRef<HTMLInputElement, InputWrapperProps>((props, ref) => {
  const {
    children,
    prefix,
    suffix,
    type = 'text',
    placeholder,
    value: _value,
    ...rest
  } = props

  const [value, setValue] = useState<typeof _value>('')

  useEffect(() => {
    setValue(_value ?? '')
  }, [_value]);

  return (
    <div className={'nd-input-wrapper'}>
      {prefix && <span>{prefix}</span>}
      <input ref={ref} type={type} placeholder={placeholder} value={value} {...rest}/>
      {suffix && <span>{suffix}</span>}
    </div>
  )
})

export default InputWrapper
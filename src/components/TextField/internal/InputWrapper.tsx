import React, {forwardRef, InputHTMLAttributes, ReactNode} from 'react'
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
    ...rest
  } = props

  return (
    <div className={'nd-input-wrapper'}>
      {prefix && <span>{prefix}</span>}
      <input ref={ref} type={type} placeholder={placeholder} {...rest}/>
      {suffix && <span>{suffix}</span>}
    </div>
  )
})

export default InputWrapper
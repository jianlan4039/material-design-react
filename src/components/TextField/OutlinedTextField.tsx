import React, {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState, FocusEvent
} from 'react'
import OutlinedField from "../Field/OutlinedField";
import './OutlinedTextField.scss'
import InputWrapper, {InputWrapperProps} from "./internal/InputWrapper";
import TextFieldContainer from "./TextFieldContainer";

export interface OutlinedTextFieldProps extends InputWrapperProps {
  children?: ReactNode
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  supportingText?: string
  supportingTextTrailing?: string
  label?: string
  error?: boolean
  disabled?: boolean
}

export default function OutlinedTextField(props: OutlinedTextFieldProps) {
  const {
    children,
    prefix,
    suffix,
    leadingIcon,
    trailingIcon,
    onChange,
    error,
    disabled,
    placeholder,
    label,
    supportingText,
    supportingTextTrailing,
    ...rest
  } = props

  const inputRef = useRef<HTMLInputElement>(null);

  const [focus, setFocus] = useState<boolean>(false)
  const [value, setValue] = useState<any>(null)

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    setValue(e.target.value)
  }

  const mouseDownHandler = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return
    }
    if (e.target !== inputRef.current) {
      e.preventDefault()
    }
    setFocus(true)
  }

  const focusHandler = (e: FocusEvent) => {
    if (disabled) {
      return
    }
    setFocus(true)
  }

  const mouseDownOutsideHandler = (e: ReactMouseEvent) => {
    if (disabled) {
      return
    }
    setFocus(false)
  }

  useEffect(() => {
    if (inputRef.current && focus) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [focus]);

  return (
    <TextFieldContainer
      className={'nd-outlined-text-field'}
      onMouseDown={mouseDownHandler}
      onMouseDownOutside={mouseDownOutsideHandler}
    >
      <OutlinedField
        start={leadingIcon}
        end={trailingIcon}
        populated={value || focus}
        error={error}
        disabled={disabled}
        focus={focus}
        label={label}
        supportingText={supportingText}
        supportingTextTrailing={supportingTextTrailing}
      >
        <InputWrapper
          ref={inputRef}
          onChange={inputChangeHandler}
          placeholder={placeholder}
          disabled={disabled}
          prefix={prefix}
          suffix={suffix}
          onFocus={focusHandler}
          {...rest}
        ></InputWrapper>
      </OutlinedField>
    </TextFieldContainer>
  )
}
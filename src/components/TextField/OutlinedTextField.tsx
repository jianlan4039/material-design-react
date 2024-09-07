import React, {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState
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
  showSupportingText?: boolean
  label?: string
  error?: boolean
  disabled?: boolean
  populated?: boolean
  focus?: boolean
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
    showSupportingText,
    value: _value,
    focus: _focus,
    populated,
    className,
    ...rest
  } = props

  const inputRef = useRef<HTMLInputElement>(null);

  const [focus, setFocus] = useState<boolean>(false)
  const [value, setValue] = useState<typeof _value>()

  useEffect(() => {
    if (inputRef.current && focus) {
      inputRef.current.focus()
    }
  }, [focus]);

  useEffect(() => {
    setValue(_value)
  }, [_value]);

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

  const focusHandler = () => {
    if (disabled) {
      return
    }
    setFocus(true)
  }

  const mouseDownOutsideHandler = () => {
    if (disabled) {
      return
    }
    setFocus(false)
  }


  return (
    <TextFieldContainer
      className={'nd-outlined-text-field'}
      onMouseDown={mouseDownHandler}
      onMouseDownOutside={mouseDownOutsideHandler}
    >
      <OutlinedField
        className={className}
        icon={leadingIcon}
        trailingIcon={trailingIcon}
        populated={Boolean(value) || focus || populated}
        error={error}
        disabled={disabled}
        focus={focus || _focus}
        label={label}
        supportingText={supportingText}
        supportingTextTrailing={supportingTextTrailing}
        showSupportingText={showSupportingText}
      >
        <InputWrapper
          ref={inputRef}
          onChange={inputChangeHandler}
          placeholder={placeholder}
          disabled={disabled}
          prefix={prefix}
          suffix={suffix}
          onFocus={focusHandler}
          value={value}
          {...rest}
        ></InputWrapper>
      </OutlinedField>
    </TextFieldContainer>
  )
}
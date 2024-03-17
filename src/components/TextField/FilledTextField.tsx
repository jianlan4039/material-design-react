import React, {
  ChangeEvent,
  InputHTMLAttributes,
  MouseEvent as ReactMouseEvent,
  ReactNode, useEffect,
  useRef,
  useState
} from 'react'
import FilledField from "../Field/FilledField";
import './FilledTextField.scss'
import InputWrapper, {InputWrapperProps} from "./internal/InputWrapper";
import TextFieldContainer from "./TextFieldContainer";

export interface FilledTextFieldProps extends InputWrapperProps {
  children?: ReactNode
  prefix?: string
  suffix?: string
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  supportingText?: string
  supportingTextTrailing?: string
  label?: string
  error?: boolean
  disabled?: boolean
}

export default function FilledTextField(props: FilledTextFieldProps) {
  const {
    children,
    prefix,
    suffix,
    leadingIcon,
    trailingIcon,
    supportingText,
    supportingTextTrailing,
    label,
    error,
    disabled,
    onChange,
    ...rest
  } = props

  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<any>(null)
  const [focus, setFocus] = useState<boolean>(false)

  const mouseDownHandler = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return
    }
    setFocus(true)
  }

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    setValue(e.target.value)
  }

  const mouseDownOutsideHandler = (e: ReactMouseEvent) => {
    if (disabled) {
      return
    }
    setFocus(false)
  }

  const clickHandler = (e: ReactMouseEvent) => {
    if (inputRef.current && e.target !== inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  };

  return (
    <TextFieldContainer
      className={'nd-filled-text-field'}
      onMouseDown={mouseDownHandler}
      onMouseDownOutside={mouseDownOutsideHandler}
      onClick={clickHandler}
    >
      <FilledField
        start={leadingIcon}
        end={trailingIcon}
        label={label}
        populated={focus || value}
        focus={focus}
        supportingText={supportingText}
        supportingTextTrailing={supportingTextTrailing}
      >
        <InputWrapper
          ref={inputRef}
          onChange={inputChangeHandler}
          prefix={prefix}
          suffix={suffix}
          disabled={disabled}
          {...rest}
        ></InputWrapper>
      </FilledField>
    </TextFieldContainer>
  )
}
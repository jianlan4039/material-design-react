import React, {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react'
import OutlinedField from "../Field/OutlinedField";
import './OutlinedTextField.scss'
import InputWrapper, {InputWrapperProps} from "./internal/InputWrapper";

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

  const rootRef = useRef<HTMLDivElement>(null);
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
    e.preventDefault()
    setFocus(true)
  }

  useEffect(() => {
    // 点击事件的处理函数
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        // 如果点击发生在组件外部
        setFocus(false)
      }
    };

    // 添加点击事件监听器到document
    document.addEventListener("mousedown", handleClickOutside);

    // 组件卸载时移除事件监听器
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [rootRef]); // 确保effect运行在组件挂载和卸载时

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [focus]);

  return (
    <div
      ref={rootRef}
      className={'nd-outlined-text-field'}
      onMouseDown={mouseDownHandler}
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
          {...rest}
        ></InputWrapper>
      </OutlinedField>
    </div>
  )
}
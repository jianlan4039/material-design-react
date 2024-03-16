import React, {InputHTMLAttributes, ReactNode, useEffect, useRef, useState} from 'react'
import OutlinedField from "../Field/OutlinedField";

export interface OutlinedTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode
  prefix?: string
  suffix?: string
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  supportingText?: string
  label?: string
}

export default function OutlinedTextField(props: OutlinedTextFieldProps) {
  const {
    children,
    prefix,
    suffix,
    leadingIcon,
    trailingIcon,
    supportingText,
    label,
    ...rest
  } = props

  const [populated, setPopulated] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null);

  const [focus, setFocus] = useState<boolean>(false)


  const rootMouseDownHandler = () => {
    setFocus(true)
    setPopulated(true)
  }

  useEffect(() => {
    // 点击事件的处理函数
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        // 如果点击发生在组件外部
        setFocus(false)
        setPopulated(false)
      }
    };

    // 添加点击事件监听器到document
    document.addEventListener("mousedown", handleClickOutside);

    // 组件卸载时移除事件监听器
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [rootRef]); // 确保effect运行在组件挂载和卸载时

  return (
    <div
      ref={rootRef}
      className={'nd-outlined-text-field'}
      onMouseDown={rootMouseDownHandler}
    >
      <OutlinedField start={leadingIcon} end={trailingIcon} label={label} populated={populated} focus={focus} {...rest}>
        <div className={'nd-input-wrapper'}>
          {prefix && <span>{prefix}</span>}
          <input type="text"/>
          {suffix && <span>{suffix}</span>}
        </div>
      </OutlinedField>
    </div>
  )
}
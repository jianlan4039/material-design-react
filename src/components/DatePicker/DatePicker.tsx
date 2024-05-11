import React, {CSSProperties, forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from 'react'
import './DatePicker.scss'
import Panel from "./internal/Panel";
import OutlinedTextField from "../TextField/OutlinedTextField";
import {outsideHandler} from "../internal/common/handlers";

export interface DatePickerProps {
  children?: ReactNode
  label?: string
  style?: CSSProperties
  format?: string
}

export interface DatePickerHandle {
  root?: HTMLDivElement | null
}

const DatePicker = forwardRef<DatePickerHandle, DatePickerProps>((props, ref) => {
  const {
    children,
    label = 'Date',
    style,
    format = "mm/dd/yyyy"
  } = props

  const [date, setDate] = useState<Date[]>([])
  const [value, setValue] = useState<string>()
  const [showDatePanel, setShowDatePanel] = useState<boolean>(false)
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) {
      return
    }
    return outsideHandler(rootRef.current, () => {
      setShowDatePanel(false)
    })
  }, [rootRef]);

  useImperativeHandle(ref, () => {
    return {
      root: rootRef.current
    }
  })

  function dateChangeHandler(dates: Date[]) {
    setDate(dates)
    setValue(formatDate(dates[0], format))
  }

  function formatDate(date: Date, format: string) {
    // 提取年、月、日
    const year: number | string = date.getFullYear();
    let month: number | string = date.getMonth() + 1;  // JavaScript中月份是从0开始的，所以这里需要+1
    let day: number | string = date.getDate();

    // 确保月和日都是两位数
    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;

    // 替换格式字符串中的年月日占位符
    format = format.replace("yyyy", year.toString());
    format = format.replace("mm", month);
    format = format.replace("dd", day);

    // 返回格式化后的日期字符串
    return format;
  }

  const CalendarIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
         fill="#5f6368">
      <path
        d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
    </svg>
  )

  function focusHandler() {
    setShowDatePanel(true)
  }

  return (
    <div ref={rootRef} className={'date-picker'} style={style} tabIndex={0} onFocus={focusHandler}>
      <OutlinedTextField
        label={label}
        supportingText={format.toUpperCase()}
        value={value}
        trailingIcon={CalendarIcon}
        readOnly
        populated={showDatePanel}
        focus={showDatePanel}
        showSupportingText={showDatePanel}
        placeholder={label}
      ></OutlinedTextField>
      {showDatePanel && <Panel onDateChange={dateChangeHandler}></Panel>}
    </div>
  )
})

export default DatePicker;
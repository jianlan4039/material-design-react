import React, {forwardRef, ReactNode} from 'react'
import './DatePicker.scss'
import Panel from "./internal/Panel";

export interface DatePickerProps {
  children?: ReactNode
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
  const {
    children,
    ...rest
  } = props

  return (
    <div ref={ref} className={'date-picker'}>
      {children}
      <Panel></Panel>
    </div>
  )
})

export default DatePicker;
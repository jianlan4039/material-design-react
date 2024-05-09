import React, {CSSProperties, forwardRef, ReactNode} from 'react'
import './DatePicker.scss'
import Panel from "./internal/Panel";
import OutlinedTextField from "../TextField/OutlinedTextField";

export interface DatePickerProps {
  children?: ReactNode
  label?: string
  style?: CSSProperties
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>((props, ref) => {
  const {
    children,
    label = 'Date',
    style,
    ...rest
  } = props

  return (
    <div ref={ref} className={'date-picker'} style={style}>
      <OutlinedTextField label={label} supportingText={'MM/DD/YYY'} readOnly={true}></OutlinedTextField>
      <Panel></Panel>
    </div>
  )
})

export default DatePicker;
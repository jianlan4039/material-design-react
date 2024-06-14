import React, {forwardRef} from 'react'
import FilledField from "../Field/FilledField";
import Select, {SelectProps} from "./internal/Select";
import './FilledSelect.scss'

export interface FilledSelectProps extends SelectProps {
}

const FilledSelect = Select(forwardRef<HTMLInputElement, FilledSelectProps>(
  (props, ref) => {
    return (
      <FilledField ref={ref} {...props}></FilledField>
    )
  }
))

export default FilledSelect;
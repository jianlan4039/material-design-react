import React, {forwardRef} from 'react'
import FilledField, {FilledFieldProps} from "../Field/FilledField";
import Select, {SelectProps} from "./internal/Select";
import './FilledSelect.scss'

export interface FilledSelectProps extends SelectProps {
}

const FilledSelect = Select<HTMLDivElement, FilledSelectProps>(
  forwardRef<HTMLDivElement, FilledFieldProps>((props, ref) => {
    return (
      <FilledField ref={ref} {...props}></FilledField>
    )
  })
)

export default FilledSelect;
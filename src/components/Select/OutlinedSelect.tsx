import React, {forwardRef} from 'react'
import OutlinedField, {OutlinedFieldProps} from "../Field/OutlinedField";
import Select, {SelectProps} from "./internal/Select";

export interface OutlinedSelectProps extends SelectProps {

}

const OutlinedSelect = Select<HTMLInputElement, OutlinedSelectProps>(
  forwardRef<HTMLDivElement, OutlinedFieldProps>((props, ref) => {
    return (
      <OutlinedField ref={ref} {...props}></OutlinedField>
    )
  })
)

export default OutlinedSelect;
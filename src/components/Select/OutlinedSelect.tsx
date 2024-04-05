import React, {forwardRef, ReactNode} from 'react'
import OutlinedField, {OutlinedFieldProps} from "../Field/OutlinedField";
import Select, {SelectProps} from "./internal/Select";

export interface OutlinedSelectProps extends SelectProps {

}

const OutlinedSelect = Select<HTMLDivElement, OutlinedSelectProps>(
  forwardRef<HTMLDivElement, OutlinedFieldProps>((props, ref) => {
    return (
      <OutlinedField ref={ref} {...props}></OutlinedField>
    )
  })
)

export default OutlinedSelect;
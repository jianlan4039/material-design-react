import React, {forwardRef} from 'react'
import OutlinedField from "../Field/OutlinedField";
import Select, {SelectProps} from "./internal/Select";
import {FilledFieldProps} from "../Field/FilledField";

export interface OutlinedSelectProps extends SelectProps {}
export interface OwnedOutlinedSelectProps extends FilledFieldProps {}

const OwnedOutlinedSelect = Select(
  forwardRef<HTMLInputElement, OwnedOutlinedSelectProps>((props, ref) => {
    return <OutlinedField ref={ref} {...props}></OutlinedField>
  })
)

const OutlinedSelect = forwardRef<HTMLInputElement, OutlinedSelectProps>((props, ref) => {
  return <OwnedOutlinedSelect ref={ref} {...props} />;
});

export default OutlinedSelect;
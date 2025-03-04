import React, { forwardRef } from 'react';
import FilledField, { FilledFieldProps } from '../Field/FilledField';
import Select, { SelectProps } from './internal/Select';

export interface FilledSelectProps extends SelectProps {}
export interface OwnedFilledSelectProps extends FilledFieldProps {}

const OwnedFilledSelect = Select(
  forwardRef<HTMLInputElement, OwnedFilledSelectProps>((props, ref) => {
    return <FilledField ref={ref} {...props} />;
  })
);

const FilledSelect = forwardRef<HTMLInputElement, FilledSelectProps>((props, ref) => {
  return <OwnedFilledSelect ref={ref} {...props} />;
});

export default FilledSelect;
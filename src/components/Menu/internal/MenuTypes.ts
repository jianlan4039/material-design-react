import {ReactNode} from "react";

export type OptionValue = string | readonly string[] | number | undefined;

export interface Option {
  label: string
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  subMenu?: Option[]
  value?: OptionValue
  customOpenIcon?: ReactNode
}
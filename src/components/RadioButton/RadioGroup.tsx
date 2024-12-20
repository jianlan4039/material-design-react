import React, {ReactNode, useState} from 'react'
import {SelectionContextProvider} from "../internal/context/MultiSelectContextProvider";

export interface RadioGroupProps {
  children?: ReactNode
}

type Value = string | readonly string[] | number | undefined;

export default function RadioGroup(props: RadioGroupProps) {
  const {
    children,
  } = props

  const [options, setOptions] = useState<Value[]>()

  return (
    <div className={'nd-radio-group'}>
      <SelectionContextProvider multiple={false} list={options} setList={setOptions}>
        {children}
      </SelectionContextProvider>
    </div>
  )
}
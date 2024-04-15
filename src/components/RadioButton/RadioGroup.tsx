import React, {ReactNode, useState} from 'react'
import {SelectionContextProvider} from "../internal/context/SelectionContext";

export interface RadioGroupProps {
  children?: ReactNode
  options?: RadioGroupProps[]
}

type Value = string | readonly string[] | number | undefined;

export default function RadioGroup(props: RadioGroupProps) {
  const {
    children,
  } = props

  const [options, setOptions] = useState<Value[]>()

  return (
    <div>
      <SelectionContextProvider multiple={false} list={options} setList={setOptions}>
        {children}
      </SelectionContextProvider>
    </div>
  )
}
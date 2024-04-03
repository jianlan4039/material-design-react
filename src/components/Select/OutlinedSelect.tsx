import React, {forwardRef, ReactNode, useEffect, useId, useRef, useState, MouseEvent} from 'react'
import OutlinedField from "../Field/OutlinedField";
import Select from "./internal/Select";
import {MenuItemProps} from "../Menu/MenuItem";
import {outsideHandler} from "../internal/common/handlers";

export interface OutlinedSelectProps {
  children?: ReactNode
  options?: MenuItemProps[]
  label?: string
}

const OutlinedSelect = forwardRef<HTMLDivElement, OutlinedSelectProps>((props, ref) => {
  const {
    children,
    label,
    options,
    ...rest
  } = props

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const id = useId()

  const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    if (rootRef.current) {
      outsideHandler(rootRef.current, () => {
        setIsOpen(false)
      })
    }
  }, [rootRef]);

  return (
    <Select ref={rootRef} options={options} open={isOpen}>
      <OutlinedField label={label} onClick={clickHandler} focus={isOpen}>
        <select name={label} id={id}></select>
      </OutlinedField>
    </Select>
  )
})

export default OutlinedSelect;
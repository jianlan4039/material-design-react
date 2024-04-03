import React, {forwardRef, MouseEvent, ReactNode, useEffect, useId, useRef, useState} from 'react'
import FilledField from "../Field/FilledField";
import './FilledSelect.scss'
import {MenuItemProps} from "../Menu/MenuItem";
import {outsideHandler} from "../internal/common/handlers";
import Select from "./internal/Select";

export interface FilledSelectProps {
  children?: ReactNode
  options?: MenuItemProps[]
  label?: string
}

const FilledSelect = forwardRef<HTMLDivElement, FilledSelectProps>((props, ref) => {
  const {
    children,
    options,
    label,
    ...rest
  } = props

  const id = useId()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
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
    <Select ref={rootRef} className={'filled-select'} open={isOpen} options={options}>
      <FilledField onClick={clickHandler} focus={isOpen} label={label}>
        <select name={label} id={id}>
          <option value=""></option>
        </select>
      </FilledField>
    </Select>
  )
})

export default FilledSelect;
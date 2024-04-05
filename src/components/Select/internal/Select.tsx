import React, {ComponentType, forwardRef, HTMLAttributes, ReactNode, useEffect, useId, useRef, useState} from 'react'
import Menu, {MenuProps} from "../../Menu/Menu";
import {Corner} from "../../internal/alignment/geometry";
import {MenuItemProps} from "../../Menu/MenuItem";
import {BaseElement} from "../../internal/common/BaseElement";
import './Select.scss'
import {Option, OptionValue} from "../../Menu/internal/menuTypes";
import {FieldProps} from "../../Field/internal/Field";
import {outsideHandler} from "../../internal/common/handlers";

export interface SelectProps extends BaseElement {
  children?: ReactNode
  items?: MenuItemProps[]
  label?: string
  onChange?: (value: OptionValue) => void
  multiple?: boolean
}

function Select<R extends HTMLDivElement, T extends SelectProps>(Field: ComponentType<FieldProps>) {
  return forwardRef<R, T>((props, ref) => {
    const {
      items,
      label,
      onChange,
      multiple,
      ...rest
    } = props

    const id = useId()
    const fieldRef = useRef<HTMLDivElement>(null);
    const [anchor, setAnchor] = useState<HTMLElement>()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const [value, setValue] = useState<OptionValue>()
    const [showLabel, setShowLabel] = useState<string>()

    const clickHandler = () => {
      setIsOpen(!isOpen)
    }

    const closeHandler = () => {
      setIsOpen(false)
    }

    const changeHandler = (value: OptionValue, option?: MenuItemProps) => {
      setValue(value)
      onChange?.(value)
      option && setShowLabel(option.label)
    }

    const mouseDownHandler = () => {
      setIsFocus(true)
    }

    useEffect(() => {
      let cleanHandler: () => void;

      if (fieldRef.current) {
        setAnchor(fieldRef.current)
        cleanHandler = outsideHandler(fieldRef.current, () => {
          setIsFocus(false)
        })
      }
      return () => {
        cleanHandler?.()
      }
    }, [fieldRef])

    return (
      <div ref={ref} className={`select`} onMouseDown={mouseDownHandler}>
        <Field
          ref={fieldRef}
          focus={isFocus}
          label={label}
          populated={Boolean(label && (isOpen || value))}
          onClick={clickHandler}
        >
          <label>{showLabel}</label>
        </Field>
        <Menu
          open={isOpen}
          anchorEl={anchor}
          menuAlignCorner={Corner.START_START}
          anchorAlignCorner={Corner.END_START}
          items={items}
          onClosed={closeHandler}
          onChange={changeHandler}
          multiple={multiple}
        ></Menu>
      </div>
    )
  })
}

export default Select;
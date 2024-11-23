import React, { ComponentType, forwardRef, ReactNode, useEffect, useId, useRef, useState} from 'react'
import Menu from "../../Menu/Menu";
import {Corner} from "../../internal/alignment/geometry";
import {MenuItemProps} from "../../Menu/MenuItem";
import './Select.scss'
import {OptionValue} from "../../Menu/internal/menuTypes";
import {FieldProps} from "../../Field/internal/Field";
import {outsideHandler} from "../../internal/common/handlers";

export interface SelectProps extends FieldProps {
  children?: ReactNode
  items?: MenuItemProps[]
  label?: string
  id?: string
  name?: string
  onChange?: (value: OptionValue) => void
  multiple?: boolean
}

function Select<R extends HTMLInputElement, T extends SelectProps>(Field: ComponentType<any>) {
  return forwardRef<R, T>((props, ref) => {
    const {
      items,
      label,
      id,
      name,
      onChange,
      multiple
    } = props

    const internalId = useId()
    const fieldRef = useRef<R>(null);
    const containerRef = useRef<HTMLDivElement>(null)
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
      option && setShowLabel(option.headline)
    }

    const mouseDownHandler = () => {
      setIsFocus(true)
    }

    useEffect(() => {
      let cleanHandler: () => void;
      if (fieldRef.current) {
        setAnchor(fieldRef.current)
      }
      if (containerRef.current) {
        cleanHandler = outsideHandler(containerRef.current, () => {
          setIsFocus(false)
        })
      }
      return () => {
        cleanHandler?.()
      }
    }, [fieldRef, containerRef])

    function selectFocusHandler() {
      setIsFocus(true)
    }

    return (
      <div ref={containerRef} className={`select`} onMouseDown={mouseDownHandler}>
        <Field
          ref={fieldRef}
          focus={isFocus}
          label={label}
          populated={Boolean(label && (isOpen || value))}
          onClick={clickHandler}
        >
          <label className={'nd-select__label'} htmlFor={id ?? internalId}>{showLabel}</label>
          <input
            ref={ref}
            type={'text'}
            className={'nd-select__input'}
            name={name ?? internalId}
            id={id ?? internalId}
            onFocus={selectFocusHandler}
            value={value}
          ></input>
        </Field>
        <Menu
          open={isOpen}
          anchorEl={anchor}
          menuCorner={Corner.START_START}
          anchorCorner={Corner.END_START}
          items={items}
          onClosed={closeHandler}
          onSelected={changeHandler}
          multiple={multiple}
        ></Menu>
      </div>
    )
  })
}

export default Select;
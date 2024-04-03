import React, {forwardRef, ReactNode, useEffect, useId, useRef, useState} from 'react'
import Menu from "../../Menu/Menu";
import {Corner} from "../../internal/alignment/geometry";
import {MenuItemProps} from "../../Menu/MenuItem";
import {BaseProps} from "../../internal/common/BaseProps";
import './Select.scss'
import {Option} from "../../Menu/internal/MenuTypes";

export interface SelectProps extends BaseProps {
  children?: ReactNode
  options?: Option[]
  open?: boolean
}

const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    children,
    options,
    open,
    className,
    ...rest
  } = props

  const fieldRef = useRef<HTMLDivElement>(null);

  const [anchor, setAnchor] = useState<HTMLElement>()

  const valueChangeHandler = (value: any) => {

  }

  useEffect(() => {
    if (fieldRef.current) {
      setAnchor(anchor)
    }
  }, [fieldRef])

  return (
    <div className={`select ${className}`} ref={ref} {...rest}>
      <div ref={fieldRef} className={'select-field-slot'}>
        {children}
      </div>
      <Menu
        open={open}
        anchorEl={anchor}
        menuAlignCorner={Corner.START_START}
        anchorAlignCorner={Corner.END_START}
        items={options}
      ></Menu>
    </div>
  )
})

export default Select;
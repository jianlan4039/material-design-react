import React, {forwardRef, HTMLAttributes, memo, ReactNode, useEffect, useRef} from 'react'
import cln from "classnames";
import './MenuItem.scss'
import StateLayer from "../StateLayer";
import MenuItemContent, {MenuItemContentProps} from "./content/MenuItemContent";

export interface MenuItemProps extends MenuItemContentProps, HTMLAttributes<HTMLLIElement> {
  children?: ReactNode
  label?: string
}

const MenuItem = memo(forwardRef<HTMLLIElement, MenuItemProps>((props, ref) => {
  const {
    children,
    label,
    className,
    ...rest
  } = props

  return (
    <li ref={ref} className={cln('nd-menu-item', className)}>
      <StateLayer></StateLayer>
      <MenuItemContent {...rest}>
        <label className={'nd-menu-item__label'}>{label || children}</label>
      </MenuItemContent>
    </li>
  )
}))

export default MenuItem
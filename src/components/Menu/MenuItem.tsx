import React, {forwardRef, memo, ReactNode, useEffect, useRef} from 'react'
import cln from "classnames";
import './MenuItem.scss'
import StateLayer from "../StateLayer";
import MenuItemContent, {MenuItemContentProps} from "./content/MenuItemContent";

export interface MenuItemProps extends MenuItemContentProps {
  children?: ReactNode
  label?: string
}

const MenuItem = memo(forwardRef<HTMLLIElement, MenuItemProps>((props, ref) => {
  const {
    children,
    label,
    ...rest
  } = props

  return (
    <li ref={ref} className={'nd-menu-item-container'}>
      <StateLayer>
        <MenuItemContent {...rest}>
          <label className={'nd-menu-item__label'}>{label || children}</label>
        </MenuItemContent>
      </StateLayer>
    </li>
  )
}))

export default MenuItem
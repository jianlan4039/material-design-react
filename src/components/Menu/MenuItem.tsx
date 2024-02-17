import React, {forwardRef, HTMLAttributes, memo, ReactNode, useEffect, useRef} from 'react'
import cln from "classnames";
import './MenuItem.scss'
import StateLayer from "../StateLayer";
import MenuItemContent, {MenuItemContentProps} from "./content/MenuItemContent";
import FocusRing from "../Focus/FocusRing";

export interface MenuItemProps extends MenuItemContentProps, HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  label?: string
}

const MenuItem = memo(forwardRef<HTMLDivElement, MenuItemProps>((props, ref) => {
  const {
    children,
    label,
    className,
    ...rest
  } = props

  return (
    <div ref={ref} className={cln('nd-menu-item', className)}>
      <FocusRing></FocusRing>
      <StateLayer></StateLayer>
      <MenuItemContent {...rest}>
        <label className={'nd-menu-item__label'}>{label || children}</label>
      </MenuItemContent>
    </div>
  )
}))

export default MenuItem
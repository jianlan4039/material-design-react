import React, {forwardRef, HTMLProps, ReactNode, useEffect, useImperativeHandle, useRef, useState} from 'react'
import ListItem, {ListItemProps, ListItemHandle} from "../List/ListItem";
import SubMenu from "./SubMenu";
import {outsideHandler} from "../internal/common/handlers";
import {MenuHandle} from "./Menu";

export interface MenuItemProps extends Omit<ListItemProps, 'supportingText' | 'interactive'> {
  children?: ReactNode
  duration?: number
  delay?: number
  easing?: string
  show?: boolean
  subMenu?: MenuItemProps[]
}

export interface MenuItemHandle extends HTMLProps<HTMLDivElement> {
  root?: HTMLDivElement | null
}

const MenuItem = forwardRef<MenuItemHandle, MenuItemProps>((props, ref) => {
  const {
    children,
    duration,
    delay,
    easing,
    show,
    subMenu,
    //style仅仅中转给submenu，因为submenu的自定义样式必须保持与menu一致
    style,
    ...rest
  } = props

  const listItemRef = useRef<ListItemHandle>(null);
  const menuItemRef = useRef<HTMLDivElement>(null);
  const subMenuRef = useRef<MenuHandle>(null);

  const [anchor, setAnchor] = useState<HTMLElement>()
  const [open, setOpen] = useState<boolean>(false)

  const mouseOverHandler = () => {
    setOpen(true)
  }

  const mouseOutHandler = () => {
    setOpen(false)
  }

  useImperativeHandle(ref, () => ({
    root: menuItemRef.current
  }))

  useEffect(() => {
    if (listItemRef.current && listItemRef.current && listItemRef.current.root) {
      setAnchor(listItemRef.current.root)
    }
  }, [listItemRef]);

  useEffect(() => {
    if (menuItemRef.current && menuItemRef.current) {
      subMenu && outsideHandler(menuItemRef.current, () => {
        setOpen(false)
      })
    }
  }, [subMenuRef]);

  return (
    <div
      ref={menuItemRef}
      className={'menu-item'}
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
    >
      <ListItem
        ref={listItemRef}
        interactive={true}
        forceHover={open}
        {...rest}
      >
      </ListItem>
      {
        subMenu &&
        <SubMenu
          ref={subMenuRef}
          items={subMenu}
          anchorEl={anchor}
          style={style}
          open={open}
        ></SubMenu>
      }
    </div>
  )
})

export default MenuItem;
import React, {CSSProperties, forwardRef, useEffect, useId, useRef, useState} from 'react'
import List from "../List/List";
import {BaseProps} from "../internal/common/BaseProps";
import MenuItem, {MenuItemHandle, MenuItemProps} from "./MenuItem";
import {Corner} from "../internal/alignment/geometry";
import './Menu.scss'

export interface MenuProps extends BaseProps {
  items?: MenuItemProps[]
  open?: boolean
  anchorEl?: HTMLElement
  menuAlignCorner?: Corner
  anchorAlignCorner?: Corner
}

const Menu = forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  const {
    items,
    style,
    open,
    anchorAlignCorner = Corner.END_START,
    menuAlignCorner = Corner.START_START,
    anchorEl,
    ...rest
  } = props

  const itemRefs = useRef<HTMLElement[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuOffsetStyle, setMenuOffsetStyle] = useState<CSSProperties>()

  const getChildren = () => {
    return items?.map((itemProps, index) => {
      const menuItemRef = useRef<MenuItemHandle>(null);
      const id = useId()

      useEffect(() => {
        if (menuItemRef.current) {
          menuItemRef.current?.root && itemRefs.current.push(menuItemRef.current.root)
        }
      }, [menuItemRef]);

      return (
        <MenuItem
          key={id}
          ref={menuItemRef}
          interactive
          {...itemProps}
        ></MenuItem>
      )
    })
  }

  //当且仅当position为absolute且有一个外部容器，其position不为static时有效。
  const alignMenuAgainstAnchor = (anchor: HTMLElement, menu: HTMLElement, anchorCorner: Corner, menuCorner: Corner) => {
    const {height: anchorHeight, width: anchorWidth} = anchor?.getBoundingClientRect()
    const {top: menuTop, left: menuLeft, height: menuHeight, width: menuWidth} = menu?.getBoundingClientRect()
    const {offsetLeft: anchorLeft, offsetTop: anchorTop} = anchor
    const {innerHeight, innerWidth} = window


    const anchorCorners = {
      [Corner.START_START]: {x: anchorLeft, y: anchorTop},
      [Corner.START_END]: {x: anchorLeft + anchorWidth, y: anchorTop},
      [Corner.END_START]: {x: anchorLeft, y: anchorTop + anchorHeight},
      [Corner.END_END]: {x: anchorLeft + anchorWidth, y: anchorTop + anchorHeight},
    }

    let menuPosition: { top?: number, left?: number, bottom?: number } = {}
    const {y, x} = anchorCorners[anchorCorner]
    console.log('anchor corner:', x, y)

    switch (menuCorner) {
      case Corner.START_START:
        menuPosition = {
          top: y,
          left: x
        }
        break
      case Corner.START_END:
        menuPosition = {
          top: y,
          left: x - menuWidth
        }
        break
      case Corner.END_START:
        menuPosition = {
          bottom: y,
          left: x
        }
        break
      case Corner.END_END:
        menuPosition = {
          bottom: y,
          left: x - menuWidth
        }
        break
    }
    console.log('menu position:', menuPosition)

    if (menuPosition.top && menuPosition.top + menuTop > innerHeight) {
      const offsetTop = menuTop + menuPosition.top
      if (offsetTop + menuHeight > innerHeight || offsetTop < 0) {
        menuPosition.top = 0
      }
    }
    if (menuPosition.bottom) {
      const offsetBottom = innerHeight - menuTop - menuHeight + menuPosition.bottom
      if (offsetBottom > innerHeight || offsetBottom < 0) {
        menuPosition.bottom = 0
      }
    }
    if (menuPosition.left) {
      const offsetLeft = menuLeft + menuPosition.left
      if (offsetLeft < 0 || offsetLeft > innerWidth) {
        menuPosition.left = 0
      }
    }

    return menuPosition
  }

  const animateOpen = () => {

  }

  useEffect(() => {
    if (menuRef.current && anchorEl) {
      const menuOffsetPosition = alignMenuAgainstAnchor(anchorEl, menuRef.current, anchorAlignCorner, menuAlignCorner)
      const positionStyle: CSSProperties = {left: `${menuOffsetPosition.left}px`}
      if (menuOffsetPosition.top !== undefined) {
        positionStyle.top = `${menuOffsetPosition.top}px`
      } else {
        positionStyle.bottom = `${menuOffsetPosition.bottom}px`
      }
      setMenuOffsetStyle(positionStyle)
    }
  }, [menuRef, anchorEl, anchorAlignCorner, menuAlignCorner]);

  useEffect(() => {
    if (open) {
      animateOpen()
    } else if (open === false) {

    } else {

    }
  }, [open]);

  return (
    <div ref={menuRef} style={{...style, ...menuOffsetStyle}} className={'menu'}>
      <List {...rest}>
        {getChildren()}
      </List>
    </div>
  )
})

export default Menu;
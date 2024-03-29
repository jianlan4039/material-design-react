import React, {forwardRef, useRef} from 'react'
import {Corner} from "../internal/alignment/geometry";
import './SubMenu.scss'
import Menu, {MenuHandle, MenuProps} from "./Menu";

export interface SubMenuProps extends MenuProps {
}

const SubMenu = forwardRef<MenuHandle, SubMenuProps>((props, ref) => {
  const {
    anchorEl,
    items,
    open,
    style,
    ...rest
  } = props

  return (
    <Menu
      ref={ref}
      anchorEl={anchorEl}
      items={items}
      className={'sub-menu'}
      menuAlignCorner={Corner.START_START}
      anchorAlignCorner={Corner.START_END}
      open={open}
      style={style}
      quick={true}
      {...rest}
    >
    </Menu>
  )
})

export default SubMenu;
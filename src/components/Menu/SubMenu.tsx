import React, {CSSProperties, forwardRef, HTMLProps, useEffect, useId, useRef, useState, MouseEvent} from 'react'
import {Corner} from "../internal/alignment/geometry";
import {MenuHandle, MenuProps} from "./Menu";
import MenuItem from "./MenuItem";
import {alignAnchor} from "./locate";
import Elevation from "../Elevation";
import c from "classnames";
import './SubMenu.scss'

export interface SubMenuProps extends MenuProps {
}

export interface SubMenuHandle extends MenuHandle {
}

const SubMenu = forwardRef<SubMenuHandle, SubMenuProps>((props, ref) => {
  const {
    anchorEl,
    items,
    open,
    style,
    ...rest
  } = props

  const rootRef = useRef<HTMLMenuElement>(null)
  const [offsetStyles, setOffsetStyles] = useState<CSSProperties>()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const getChildren = () => {
    return items?.map((item) => {
      const id = useId()

      return (
        <MenuItem
          key={id}
          style={style}
          {...item}
        ></MenuItem>
      )
    })
  }

  useEffect(() => {
    setIsVisible(Boolean(open))
    if (anchorEl && rootRef.current) {
      setOffsetStyles(alignAnchor(anchorEl, rootRef.current, Corner.START_END, Corner.START_START))
    }
  }, [open]);

  return (
    <menu
      ref={rootRef}
      className={c('sub-menu menu', {
        'visible': isVisible,
        'hidden': !isVisible,
      })}
      style={{...style, ...offsetStyles}}
    >
      <Elevation></Elevation>
      {getChildren()}
    </menu>
  )
})

export default SubMenu;
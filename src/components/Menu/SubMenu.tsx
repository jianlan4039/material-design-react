import React, {ReactNode, useRef, useState} from 'react'
import './SubMenu.scss'
import Menu from "./Menu";

export interface SubMenuProps {
  children?: ReactNode
  menuItem?: ReactNode
}

export default function SubMenu(props: SubMenuProps) {
  const {
    children,
    menuItem,
    ...rest
  } = props

  const headerRef = useRef<HTMLDivElement>(null)
  const mouseHoverTimeoutIdRef = useRef<NodeJS.Timeout>();
  const [open, setOpen] = useState(false)

  const mouseEnterHandler = () => {
    mouseHoverTimeoutIdRef.current = setTimeout(() => {
      setOpen(true)
    }, 250)
  }

  const mouseLeaveHandler = () => {
    clearTimeout(mouseHoverTimeoutIdRef.current)
    setOpen(false)
  }

  return (
    <div
      className={'nd-sub-menu'}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div
        ref={headerRef}
        className={'nd-sub-menu__header'}
      >
        {menuItem}
      </div>
      <Menu
        anchorEl={headerRef.current}
        menuCorner={'start_start'}
        anchorCorner={'start_end'}
        open={open}
      >
        {children}
      </Menu>
    </div>
  )
}
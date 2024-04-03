import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  MouseEvent, HTMLAttributes, LiHTMLAttributes, useContext
} from 'react'
import ListItem, {ListItemHandle} from "../List/ListItem";
import SubMenu from "./SubMenu";
import {outsideHandler} from "../internal/common/handlers";
import {MenuHandle} from "./Menu";
import {Option} from "./internal/MenuTypes";
import './MenuItem.scss'
import {SelectionContext} from "../internal/context/SelectionContext";

export interface MenuItemProps extends LiHTMLAttributes<HTMLLIElement> {
  children?: ReactNode
  customOpenIcon?: ReactNode
  subMenu?: Option[]
  start?: ReactNode
  end?: ReactNode
  label?: string
}

export interface MenuItemHandle {
  root?: HTMLLIElement | null
}

const MenuItem = forwardRef<MenuItemHandle, MenuItemProps>((props, ref) => {
  const {
    children,
    subMenu,
    //style仅仅中转给submenu，因为submenu的自定义样式必须保持与menu一致
    style,
    className,
    customOpenIcon,
    end,
    start,
    onMouseOver,
    onMouseOut,
    onMouseDown,
    onClick,
    label,
    value,
    ...rest
  } = props

  const listItemRef = useRef<ListItemHandle>(null);
  const subMenuRef = useRef<MenuHandle>(null);
  const closeTimeoutIdRef = useRef<NodeJS.Timeout>();

  const [anchor, setAnchor] = useState<HTMLDivElement>()
  const [open, setOpen] = useState<boolean>(false)
  const {multiple = false, options = [], setOption} = useContext(SelectionContext)

  const mouseOverHandler = (e: MouseEvent) => {
    e.stopPropagation()
  }

  const mouseEnterHandler = (e: MouseEvent) => {
    clearTimeout(closeTimeoutIdRef.current)
    setOpen(Boolean(subMenu) && true)
  }

  const mouseLeaveHandler = (e: MouseEvent) => {
    e.preventDefault()
    closeTimeoutIdRef.current = setTimeout(() => {
      setOpen(false)
    }, 500)
  }

  const mouseDownHandler = (e: MouseEvent) => {
    e.stopPropagation()
  }

  const mouseClickHandler = (e: MouseEvent<HTMLLIElement>) => {
    onClick?.(e)
    if (multiple) {
      !subMenu && setOption?.([...options, value])
    } else {
      !subMenu && setOption?.([value])
    }
  }

  useImperativeHandle(ref, () => ({
    root: listItemRef.current?.root
  }))

  useEffect(() => {
    if (listItemRef.current && listItemRef.current.body) {
      setAnchor(listItemRef.current.body)
    }
  }, [listItemRef]);

  useEffect(() => {
    if (listItemRef.current && listItemRef.current.root) {
      subMenu && outsideHandler(listItemRef.current.root, () => {
        setOpen(false)
      })
    }
  }, [subMenuRef]);

  return (
    <ListItem
      ref={listItemRef}
      className={`menu-item ${open ? 'selected' : ''}`}
      label={label}
      start={start}
      end={subMenu ? customOpenIcon ? customOpenIcon :
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M400-280v-400l200 200-200 200Z"/>
        </svg> : end
      }
      value={value}
      onMouseOver={mouseOverHandler}
      onMouseDown={mouseDownHandler}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onClick={mouseClickHandler}
      {...rest}
    >
      {
        subMenu && <SubMenu
          ref={subMenuRef}
          items={subMenu}
          anchorEl={anchor}
          style={style}
          open={open}
        ></SubMenu>
      }
    </ListItem>
  )
})

export default MenuItem;
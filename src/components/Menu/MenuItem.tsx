import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  MouseEvent, LiHTMLAttributes, useContext
} from 'react'
import ListItem, {ListItemHandle} from "../List/ListItem";
import SubMenu, {SubMenuHandle} from "./SubMenu";
import {outsideHandler} from "../internal/common/handlers";
import {Option} from "./internal/menuTypes";
import './MenuItem.scss'
import {MultiSelectContext} from "../internal/context/MultiSelectContext";

export interface MenuItemProps extends LiHTMLAttributes<HTMLLIElement> {
  children?: ReactNode
  customOpenIcon?: ReactNode
  subMenu?: Option[]
  start?: ReactNode
  end?: ReactNode
  label?: string
  selected?: boolean
  keepOpen?: boolean
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
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onClick,
    label,
    value,
    selected,
    keepOpen,
    ...rest
  } = props

  const listItemRef = useRef<ListItemHandle>(null);
  const subMenuRef = useRef<SubMenuHandle>(null);
  const closeTimeoutIdRef = useRef<NodeJS.Timeout>();

  const [anchor, setAnchor] = useState<HTMLDivElement>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const {multiple = false, list = [], setList} = useContext(MultiSelectContext)

  const mouseOverHandler = (e: MouseEvent<HTMLLIElement>) => {
    onMouseOver?.(e)
    e.stopPropagation()
  }

  const mouseEnterHandler = (e: MouseEvent<HTMLLIElement>) => {
    onMouseEnter?.(e)
    clearTimeout(closeTimeoutIdRef.current)
    setIsOpen(Boolean(subMenu) && true)
  }

  const mouseLeaveHandler = (e: MouseEvent<HTMLLIElement>) => {
    onMouseLeave?.(e)
    e.preventDefault()
    closeTimeoutIdRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 500)
  }

  const mouseDownHandler = (e: MouseEvent<HTMLLIElement>) => {
    onMouseDown?.(e)
    e.stopPropagation()
  }

  const mouseClickHandler = (e: MouseEvent<HTMLLIElement>) => {
    onClick?.(e)
    onSelected()
  }

  const onSelected = () => {
    if (value === undefined || value === null) {
      return
    }
    if (multiple) {
      const index = list.indexOf(value)
      index >= 0 ? list.splice(index, 1) : list.push(value)
      !subMenu && setList?.([...list], props)
    } else {
      !subMenu && setList?.([value], props)
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
        setIsOpen(false)
      })
    }
  }, [subMenuRef]);

  return (
    <ListItem
      ref={listItemRef}
      className={`menu-item ${selected || isOpen ? 'selected' : ''}`}
      label={label}
      icon={start}
      trailingIcon={subMenu ? customOpenIcon ? customOpenIcon :
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
          open={isOpen}
        ></SubMenu>
      }
    </ListItem>
  )
})

export default MenuItem;
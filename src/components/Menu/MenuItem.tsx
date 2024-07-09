import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  MouseEvent,
  useContext,
} from 'react';
import ListItem, {ListItemHandle, ListItemProps} from "../List/ListItem";
import SubMenu, {SubMenuHandle} from "./SubMenu";
import {outsideHandler} from "../internal/common/handlers";
import './MenuItem.scss';
import classNames from "classnames";
import {SelectionContext} from "./internal/context";

export interface MenuItemProps extends ListItemProps {
  children?: ReactNode
  customOpenIcon?: ReactNode
  subMenu?: MenuItemProps[]
  icon?: ReactNode
  trailingIcon?: ReactNode
  label?: string
  keepOpen?: boolean
  value?: string | number
  setIsMenuOpen?: (open: boolean) => void
}

export interface MenuItemHandle {
  root?: HTMLLIElement | null
}

const MenuItem = forwardRef<MenuItemHandle, MenuItemProps>((props, ref) => {
  const {
    subMenu,
    style, //style仅仅中转给submenu，因为submenu的自定义样式必须保持与menu一致
    customOpenIcon,
    trailingIcon,
    icon,
    label,
    keepOpen,
    value,
    id,
    onMouseEnter,
    onMouseLeave,
    setIsMenuOpen,
  } = props

  const listItemRef = useRef<ListItemHandle>(null);
  const subMenuRef = useRef<SubMenuHandle>(null);
  const closeTimeoutIdRef = useRef<NodeJS.Timeout>();

  const [anchor, setAnchor] = useState<HTMLDivElement>()
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false)
  const {config: {multiple}, list = [], setList} = useContext(SelectionContext)

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
        setIsSubmenuOpen(false)
      })
    }
  }, [subMenuRef]);

  const mouseEnterHandler = (e: MouseEvent<HTMLLIElement>) => {
    onMouseEnter?.(e)
    clearTimeout(closeTimeoutIdRef.current)
    setIsSubmenuOpen(Boolean(subMenu) && true)
  }

  const mouseLeaveHandler = (e: MouseEvent<HTMLLIElement>) => {
    onMouseLeave?.(e)
    e.preventDefault()
    closeTimeoutIdRef.current = setTimeout(() => {
      setIsSubmenuOpen(false)
    }, 500)
  }

  /**
   * 点击回调函数，如果设置了id，那么就有选中效果，以及可以预制选中项。
   */
  const onSelected = () => {
    if (!(id === undefined || id === null)) {
      if (multiple) {
        const index = list.indexOf(id)
        index >= 0 ? list.splice(index, 1) : list.push(id)
        !subMenu && setList?.([...list])
      } else {
        !subMenu && setList?.([id])
      }
    }

    if (!keepOpen) {
      setIsMenuOpen?.(false)
      setIsSubmenuOpen(false)
    }
  }

  return (
    <ListItem
      ref={listItemRef}
      className={classNames(`menu-item`, {
        'selected': isSubmenuOpen || id && list?.includes(id),
        'open': isSubmenuOpen
      })}
      label={label}
      icon={icon}
      trailingIcon={subMenu ? customOpenIcon ? customOpenIcon :
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M400-280v-400l200 200-200 200Z"/>
        </svg> : trailingIcon
      }
      value={value}
      id={id}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onClick={onSelected}
    >
      {
        subMenu && <SubMenu
          ref={subMenuRef}
          items={subMenu}
          anchorEl={anchor}
          style={style}
          open={isSubmenuOpen}
        ></SubMenu>
      }
    </ListItem>
  )
})

export default MenuItem;
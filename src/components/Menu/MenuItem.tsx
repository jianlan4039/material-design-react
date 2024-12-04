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
import classNames from "classnames";
import {SelectionContext} from "./internal/context";
import './MenuItem.scss';

export interface MenuItemProps extends ListItemProps {
  children?: ReactNode
  customOpenIcon?: ReactNode
  subMenu?: MenuItemProps[]
  icon?: ReactNode
  trailingIcon?: ReactNode
  headline?: string
  keepOpen?: boolean
  value?: number
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
    headline,
    keepOpen,
    id,
    onMouseEnter,
    onMouseLeave,
    setIsMenuOpen,
    onClick,
    ...rest
  } = props

  const listItemRef = useRef<ListItemHandle>(null);
  const subMenuRef = useRef<SubMenuHandle>(null);
  const closeTimeoutIdRef = useRef<NodeJS.Timeout>();

  const [listItemAnchor, setListItemAnchor] = useState<HTMLDivElement>()
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false)
  const {config: {multiple}, list = [], setList} = useContext(SelectionContext)

  useImperativeHandle(ref, () => ({
    root: listItemRef.current?.container
  }))

  useEffect(() => {
    if (listItemRef.current && listItemRef.current.child) {
      setListItemAnchor(listItemRef.current.child)
    }
  }, [listItemRef.current]);

  useEffect(() => {
    if (listItemRef.current && listItemRef.current.container) {
      subMenu && outsideHandler(listItemRef.current.container, () => {
        setIsSubmenuOpen(false)
      })
    }
  }, [subMenuRef.current]);

  const mouseEnterHandler = (e: MouseEvent<HTMLLIElement>) => {
    onMouseEnter?.(e)
    clearTimeout(closeTimeoutIdRef.current)
    setIsSubmenuOpen(Boolean(subMenu))
  }

  const mouseLeaveHandler = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault()
    onMouseLeave?.(e)
    closeTimeoutIdRef.current = setTimeout(() => {
      setIsSubmenuOpen(false)
    }, 500)
  }

  /**
   * 点击回调函数，如果设置了id，那么就有选中效果，以及可以预制选中项。
   */
  const clickHandler = (e:MouseEvent<HTMLLIElement>) => {
    onClick?.(e)
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
      id={id}
      ref={listItemRef}
      className={classNames(`nd-menu-item`, {
        'nd-menu-item--selected': isSubmenuOpen || id && list?.includes(id),
        'nd-menu-item--open': isSubmenuOpen
      })}
      icon={icon}
      trailingIcon={subMenu ? customOpenIcon ? customOpenIcon :
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M400-280v-400l200 200-200 200Z"/>
        </svg> : trailingIcon
      }
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onClick={clickHandler}
      headline={headline}
      {...rest}
    >
      {
        subMenu &&
        <SubMenu
          ref={subMenuRef}
          items={subMenu}
          anchorEl={listItemAnchor}
          style={style}
          open={isSubmenuOpen}
        ></SubMenu>
      }
    </ListItem>
  )
})

export default MenuItem;
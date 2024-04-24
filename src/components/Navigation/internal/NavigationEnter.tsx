import React, {forwardRef, ReactNode, useContext, useEffect, useId, useRef, useState, MouseEvent} from 'react'
import ListItem, {ListItemHandle, ListItemProps} from "../../List/ListItem";
import './NavigationEnter.scss';
import c from 'classnames'
import {IndicatorRectContext, CurrentIndicator} from "../../internal/context/indicator";

export interface NavigationEnterProps extends ListItemProps {
  children?: ReactNode
  id?: string
  active?: boolean
}

export interface NavigationEnterHandle extends ListItemHandle {

}

const NavigationEnter = forwardRef<NavigationEnterHandle, NavigationEnterProps>((props, ref) => {
  const {
    children,
    id = useId(),
    active,
    ...rest
  } = props

  const {current, setCurrent, init} = useContext(IndicatorRectContext)
  const listRef = useRef<NavigationEnterHandle>(null);
  const [isActive, setIsActive] = useState<boolean>()

  useEffect(() => {
    if (listRef.current && listRef.current.root) {
      init?.({rect: listRef.current.root.getBoundingClientRect(), id: id}, active)
    }
  }, [listRef]);

  useEffect(() => {
    if (current) {
      setIsActive(current.id === id)
    }
  }, [current]);

  const clickHandler = (e: MouseEvent<HTMLLIElement>) => {
    setCurrent?.({rect: e.currentTarget.getBoundingClientRect(), id: id})
  }

  return (
    <ListItem
      ref={listRef}
      className={c('navigation-enter', {
        'active': isActive
      })}
      onClick={clickHandler}
      {...rest}
    >
      {children}
    </ListItem>
  )
})

export default NavigationEnter;
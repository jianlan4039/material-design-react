import React, {forwardRef, HTMLProps, ReactNode, useEffect, useImperativeHandle, useRef} from 'react'
import ListItem, {ListItemProps, ListItemHandle} from "../List/ListItem";
import {EASING} from "../internal/motion/animation";

export interface MenuItemProps extends ListItemProps {
  children?: ReactNode
  duration?: number
  delay?: number
  easing?: string
  show?: boolean
}

export interface MenuItemHandle extends HTMLProps<ListItemHandle>{
  root?: HTMLElement | null
}

const MenuItem = forwardRef<MenuItemHandle, MenuItemProps>((props, ref) => {
  const {
    children,
    duration,
    delay,
    easing,
    show,
    ...rest
  } = props

  const itemRef = useRef<ListItemHandle>(null);

  const animateShow = (el: HTMLElement, duration: number, delay: number, easing: string = EASING.STANDARD) => {
    const animation = el.animate({
      opacity: ['0', '1']
    }, {duration: duration, delay: delay, easing: easing, fill: 'backwards'})
  }

  const animateHidden = (el: HTMLElement, duration: number, delay: number, easing: string = EASING.STANDARD) => {
    const animation = el.animate({
      opacity: ['1', '0']
    }, {duration: duration, delay: delay, easing: easing})
  }

  const toggleShown = (toggle?: boolean) => {

  }

  useImperativeHandle(ref, () => ({
    root: itemRef.current?.root
  }))

  useEffect(() => {
    const itemEl = itemRef.current?.root
    if (itemEl && show === true && duration && delay) {
      animateShow(itemEl, duration, delay, easing)
    } else if (itemEl && show === false && duration && delay) {
      animateHidden(itemEl, duration, delay, easing)
    } else {

    }
  }, [show, itemRef]);

  return (
    <ListItem ref={itemRef} {...rest}>
      {children}
    </ListItem>
  )
})

export default MenuItem;
import React, {HTMLAttributes, ReactNode, useEffect, useRef} from 'react'
import './Menu.scss'
import MenuContent from "./content/MenuContent";
import Elevation from "../Elevation";
import {EASING} from "../internal/motion/animation";
import MenuItem, {MenuItemProps} from "./MenuItem";
import menuItem from "./MenuItem";

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  anchorEl?: ReactNode
  menuItems?: MenuItemProps[]
  open?: boolean
}

export default function Menu(props: MenuProps) {
  const {
    anchorEl,
    menuItems,
    open,
    ...rest
  } = props

  const menuRef = useRef<HTMLDivElement>(null);

  const OPEN_FULL_DURATION = 500;
  const CLOSE_FULL_DURATION = 150;

  const animateOpen = async (el: HTMLElement, length: number) => {
    el.classList.toggle('open', true)
    const SURFACE_OPACITY_DURATION = 50;
    const rect = el.getBoundingClientRect()

    const heightAnimation = el.animate([
      {height: 0}, {height: rect.height + 'px'}
    ], {duration: OPEN_FULL_DURATION, easing: EASING.EMPHASIZED,})
    const opacityAnimation = el.animate([{opacity: 0}, {opacity: 1}], SURFACE_OPACITY_DURATION);
    await Promise.all([heightAnimation.finished, opacityAnimation.finished])
  }

  const animateClose = async (el: HTMLElement, length: number) => {
    const height = el.getBoundingClientRect().height
    const END_HEIGHT_PERCENTAGE = 0.35;
    const SURFACE_OPACITY_DURATION = 50;
    const SURFACE_OPACITY_DELAY = CLOSE_FULL_DURATION - SURFACE_OPACITY_DURATION;

    const heightAnimation = el.animate([
      {height: `${height}px`},
      {height: `${height * END_HEIGHT_PERCENTAGE}px`}
    ], {
      duration: CLOSE_FULL_DURATION,
      easing: EASING.EMPHASIZED_ACCELERATE,
    })
    const opacityAnimation = el.animate([
      {opacity: 1},
      {opacity: 0}
    ], {
      duration: SURFACE_OPACITY_DURATION,
      delay: SURFACE_OPACITY_DELAY
    })

    await Promise.all([heightAnimation.finished, opacityAnimation.finished])
    el.classList.toggle('open', false)
  }

  useEffect(() => {
    if (open) {
      menuRef.current && animateOpen(menuRef.current, menuItem.length)
    } else {
      menuRef.current && animateClose(menuRef.current, menuItem.length)
    }
  }, [open]);

  return <div ref={menuRef} className={'nd-menu'} {...rest}>
    <Elevation></Elevation>
    <MenuContent>
      {
        menuItems?.map((child, index) => {
          const length = menuItems.length
          const childRef = useRef<HTMLLIElement>(null);

          useEffect(() => {
            if (open) {
              const ITEM_OPACITY_DURATION = 250;
              const DELAY_BETWEEN_ITEMS = (OPEN_FULL_DURATION - ITEM_OPACITY_DURATION) / length;
              childRef.current?.animate([{opacity: 0}, {opacity: 1}], {
                duration: ITEM_OPACITY_DURATION,
                delay: DELAY_BETWEEN_ITEMS * index,
                fill: 'both'
              })
            } else {
              const ITEM_OPACITY_DURATION = 50;
              const ITEM_OPACITY_INITIAL_DELAY = 50;
              const DELAY_BETWEEN_ITEMS = (CLOSE_FULL_DURATION - ITEM_OPACITY_INITIAL_DELAY - ITEM_OPACITY_DURATION) / length;
              childRef.current?.animate([{opacity: 1}, {opacity: 0}], {
                duration: ITEM_OPACITY_DURATION,
                delay: ITEM_OPACITY_INITIAL_DELAY + DELAY_BETWEEN_ITEMS * (length - 1 - index),
                fill: 'both'
              })
            }
          }, [open]);

          return <MenuItem ref={childRef} key={index} {...child}></MenuItem>
        })
      }
    </MenuContent>
  </div>
}
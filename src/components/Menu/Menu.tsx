import React, {ReactNode, useEffect, useRef, useState} from 'react'
import cln from "classnames";
import './Menu.scss'
import MenuContent from "./content/MenuContent";
import Elevation from "../Elevation";
import {EASING} from '../internal/motion/animation'
import MenuItem, {MenuItemProps} from "./MenuItem";

export interface MenuProps {
  children?: ReactNode
  open?: boolean
  menuItems?: MenuItemProps[]
}

interface AnimateMenuItemProps extends MenuItemProps {
  open?: boolean
  duration: number
  delay: number
}

const AnimateMenuItem = (props: AnimateMenuItemProps) => {
  const {
    open,
    duration,
    delay,
    ...rest
  } = props

  const ref = useRef<HTMLLIElement>(null);

  const animateOpen = () => {
    if (ref.current) {
      ref.current.animate([
        {opacity: 0}, {opacity: 1}
      ], {duration: duration, delay: delay, fill: 'backwards'})
    }
  }

  useEffect(() => {
    if (open) {
      animateOpen()
    }
  }, [open]);

  return <MenuItem ref={ref} {...rest}></MenuItem>
}

export default function Menu(props: MenuProps) {
  const {
    children,
    open,
    menuItems,
    ...rest
  } = props

  const anchorRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const top = useRef<number>();
  const left = useRef<number>();

  const animateOpen = async () => {
    if (drawerRef.current) {
      const menuRect = drawerRef.current.getBoundingClientRect()
      const height = menuRect.height
      const heightAnimation = drawerRef.current.animate([
        {height: 0}, {height: height + 'px'}
      ], {easing: EASING.EMPHASIZED, duration: 500})//.playbackRate = 0.1
      const opacityAnimation = drawerRef.current.animate([
        {opacity: 0}, {opacity: 1}
      ], 50)
      await Promise.all([heightAnimation.finished, opacityAnimation.finished])
    }
  }

  const animateClose = async () => {
    if (drawerRef.current) {
      const rect = drawerRef.current.getBoundingClientRect()
      const height = rect.height
      const heightAnimation = drawerRef.current.animate([
        {height: `${height}px`}, {height: `${height * 0.35}px`}
      ], {easing: EASING.EMPHASIZED_ACCELERATE, duration: 150})
      const opacityAnimation = drawerRef.current.animate([
        {opacity: 1}, {opacity: 0}
      ], {duration: 50, delay: 100})
      await Promise.all([heightAnimation.finished, opacityAnimation.finished])
    }
  }


  useEffect(() => {
    if (!top.current && !left.current && anchorRef.current) {
      top.current = anchorRef.current.offsetHeight
      left.current = anchorRef.current.offsetLeft
    }
  }, [anchorRef.current]);

  useEffect(() => {
    if (open) {
      if (containerRef.current) {
        containerRef.current.classList.toggle('open', true)
      }
      animateOpen()
    } else {
      animateClose().then(() => {
        containerRef.current!.classList.toggle('open', false)
      })
    }
  }, [open]);

  return (
    <div className={'nd-menu-block'}>
      <div ref={anchorRef} className={'nd-menu-anchor'}>
        {children}
      </div>
      <div
        ref={containerRef}
        className={'nd-menu-container'}
        style={{top: top.current + 'px', left: left.current + 'px'}}
      >
        <Elevation>
          <div ref={drawerRef} className={'nd-menu-drawer'}>
            <MenuContent>
              {menuItems?.map((item, index) => {
                return <AnimateMenuItem
                  key={`menu-item-${index}`}
                  open={open}
                  duration={250}
                  delay={250 / menuItems.length}
                  {...item}
                ></AnimateMenuItem>
              })}
            </MenuContent>
          </div>
        </Elevation>
      </div>
    </div>
  )
}
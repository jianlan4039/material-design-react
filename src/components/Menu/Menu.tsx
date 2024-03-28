import React, {CSSProperties, forwardRef, useEffect, useId, useRef, useState} from 'react'
import List from "../List/List";
import {BaseProps} from "../internal/common/BaseProps";
import MenuItem, {MenuItemHandle, MenuItemProps} from "./MenuItem";
import {Corner} from "../internal/alignment/geometry";
import {EASING} from "../internal/motion/animation";
import c from 'classnames'
import './Menu.scss'
import Elevation from "../Elevation";

export interface MenuProps extends BaseProps {
  items?: MenuItemProps[]
  open?: boolean
  anchorEl?: HTMLElement
  menuAlignCorner?: Corner
  anchorAlignCorner?: Corner
}

const Menu = forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  const {
    items,
    style,
    open: OPEN,
    anchorAlignCorner = Corner.END_START,
    menuAlignCorner = Corner.START_START,
    anchorEl,
    ...rest
  } = props

  const openDirection = menuAlignCorner.toString().startsWith('end') ? 'UP' : 'DOWN'

  const itemRefs = useRef<HTMLElement[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null)

  const rootHeightAnimation = useRef<Animation>();
  const rootOpacityAnimation = useRef<Animation>();
  const childrenAnimations = useRef<Animation[]>([])

  const [menuOffsetStyle, setMenuOffsetStyle] = useState<CSSProperties>();
  const [open, setOpen] = useState<boolean>(false);

  const getChildren = () => {
    return items?.map((itemProps, index) => {
      const menuItemRef = useRef<MenuItemHandle>(null);
      const id = useId()

      useEffect(() => {
        if (menuItemRef.current) {
          menuItemRef.current?.root && itemRefs.current.push(menuItemRef.current.root)
        }
      }, [menuItemRef]);

      return (
        <MenuItem
          key={id}
          ref={menuItemRef}
          interactive
          {...itemProps}
        ></MenuItem>
      )
    })
  }

  //当且仅当position为absolute且有一个外部容器，其position不为static时有效。
  const alignMenuAgainstAnchor = (anchor: HTMLElement, menu: HTMLElement, anchorCorner: Corner, menuCorner: Corner) => {
    const {height: anchorHeight, width: anchorWidth} = anchor?.getBoundingClientRect()
    const {top: menuTop, left: menuLeft, height: menuHeight, width: menuWidth} = menu?.getBoundingClientRect()
    const {offsetLeft: anchorLeft, offsetTop: anchorTop, offsetParent} = anchor
    const parentHeight: number = offsetParent?.getBoundingClientRect().height ?? window.innerHeight
    const {innerHeight, innerWidth} = window

    const anchorCorners = {
      [Corner.START_START]: {x: anchorLeft, y: anchorTop},
      [Corner.START_END]: {x: anchorLeft + anchorWidth, y: anchorTop},
      [Corner.END_START]: {x: anchorLeft, y: anchorTop + anchorHeight},
      [Corner.END_END]: {x: anchorLeft + anchorWidth, y: anchorTop + anchorHeight},
    }

    let menuPosition: { top?: number, left?: number, bottom?: number } = {}
    const {y, x} = anchorCorners[anchorCorner]
    switch (menuCorner) {
      case Corner.START_START:
        menuPosition = {
          top: y,
          left: x
        }
        break
      case Corner.START_END:
        menuPosition = {
          top: y,
          left: x - menuWidth
        }
        break
      case Corner.END_START:
        menuPosition = {
          bottom: parentHeight - y,
          left: x
        }
        break
      case Corner.END_END:
        menuPosition = {
          bottom: parentHeight - y,
          left: x - menuWidth
        }
        break
    }

    if (menuPosition.top && menuPosition.top + menuTop > innerHeight) {
      const offsetTop = menuTop + menuPosition.top
      if (offsetTop + menuHeight > innerHeight || offsetTop < 0) {
        menuPosition.top = 0
      }
    }
    if (menuPosition.bottom) {
      const offsetBottom = innerHeight - menuTop - menuHeight + menuPosition.bottom
      if (offsetBottom > innerHeight || offsetBottom < 0) {
        menuPosition.bottom = 0
      }
    }
    if (menuPosition.left) {
      const offsetLeft = menuLeft + menuPosition.left
      if (offsetLeft < 0 || offsetLeft > innerWidth) {
        menuPosition.left = 0
      }
    }

    const positionStyle: CSSProperties = {left: `${menuPosition.left}px`}
    if (menuPosition.top !== undefined) {
      positionStyle.top = `${menuPosition.top}px`
    } else {
      positionStyle.bottom = `${menuPosition.bottom}px`
    }

    return positionStyle
  }

  const animateOpen = (rootEl: HTMLElement, list: HTMLElement) => {
    const openingUpwards = openDirection === 'UP';
    const FULL_DURATION = 500;
    const OPACITY_DURATION = 50;
    const ITEM_OPACITY_DURATION = 250;
    const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_DURATION) / itemRefs.current.length;

    const {height,} = rootEl.getBoundingClientRect()

    const rootHeightAnimation = rootEl.animate({
      height: ['0', `${height}px`]
    }, {duration: FULL_DURATION, easing: EASING.EMPHASIZED})

    const rootOpacityAnimation = rootEl.animate({
      opacity: ['0', '1'],
    }, {duration: OPACITY_DURATION})

    const upPositionCorrectionAnimation = list.animate([
      {transform: openingUpwards ? `translateY(-${height}px)` : ''},
      {transform: ''},
    ], {duration: FULL_DURATION, easing: EASING.EMPHASIZED});

    const childrenAnimations: Animation[] = []
    for (let i = 0; i < itemRefs.current.length; i++) {
      const directionalIndex = openingUpwards ? itemRefs.current.length - 1 - i : i;
      const child = itemRefs.current[directionalIndex]
      const childOpacityAnimation = child.animate({
        opacity: ['0', '1'],
      }, {duration: ITEM_OPACITY_DURATION, delay: DELAY_BETWEEN_ITEMS * i, fill: 'backwards'})
      childrenAnimations.push(childOpacityAnimation)
    }

    Promise.all([rootHeightAnimation.finished, rootOpacityAnimation.finished, upPositionCorrectionAnimation.finished]).then(() => {
      rootHeightAnimation.cancel()
      rootOpacityAnimation.cancel()
      childrenAnimations.forEach(childAnimation => {
        childAnimation.cancel()
      })
    })
  }

  const animateClose = (rootEl: HTMLElement, listEl: HTMLElement) => {
    const closingDownwards = openDirection === 'UP';
    const FULL_DURATION = 150;
    const OPACITY_DURATION = 50;
    const OPACITY_DELAY = FULL_DURATION - OPACITY_DURATION
    const ITEM_OPACITY_DURATION = 50;
    const ITEM_OPACITY_INITIAL_DELAY = 50;
    const END_HEIGHT_PERCENTAGE = 0.35;
    const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_INITIAL_DELAY - ITEM_OPACITY_DURATION) / itemRefs.current.length;

    const {height,} = rootEl.getBoundingClientRect()

    rootHeightAnimation.current = rootEl.animate({
      height: [`${height}px`, `${height * END_HEIGHT_PERCENTAGE}px`]
    }, {duration: FULL_DURATION, easing: EASING.EMPHASIZED_ACCELERATE, fill: 'forwards'})

    rootOpacityAnimation.current = rootEl.animate({
      opacity: ['1', '0']
    }, {duration: OPACITY_DURATION, delay: OPACITY_DELAY, fill: 'forwards'})

    const downPositionCorrectionAnimation = listEl.animate([
      {transform: ''},
      {
        transform: closingDownwards
          ? `translateY(-${height * (1 - END_HEIGHT_PERCENTAGE)}px)`
          : '',
      },
    ], {duration: FULL_DURATION, easing: EASING.EMPHASIZED_ACCELERATE});

    for (let i = 0; i < itemRefs.current.length; i++) {
      const directionalIndex = closingDownwards ? i : itemRefs.current.length - 1 - i;
      const child = itemRefs.current[directionalIndex];
      const childOpacityAnimation = child.animate({
        opacity: ['1', '0'],
      }, {
        duration: ITEM_OPACITY_DURATION,
        delay: ITEM_OPACITY_INITIAL_DELAY + DELAY_BETWEEN_ITEMS * i,
        fill: 'forwards'
      })
      childrenAnimations.current.push(childOpacityAnimation)
    }

    Promise.all([rootHeightAnimation.current.finished, rootOpacityAnimation.current.finished, downPositionCorrectionAnimation.finished]).then(() => {
      setOpen(false)
    })
  }

  useEffect(() => {
    if (menuRef.current && anchorEl) {
      setMenuOffsetStyle(alignMenuAgainstAnchor(anchorEl, menuRef.current, anchorAlignCorner, menuAlignCorner))
    }
  }, [menuRef, anchorEl, anchorAlignCorner, menuAlignCorner]);

  useEffect(() => {
    if (OPEN) {
      !open && setOpen(true)
    } else {
      open && menuRef.current && listRef.current && animateClose(menuRef.current, listRef.current)
    }
  }, [OPEN]);

  useEffect(() => {
    if (open) {
      menuRef.current && listRef.current && animateOpen(menuRef.current, listRef.current)
    } else {
      rootHeightAnimation.current?.cancel()
      rootOpacityAnimation.current?.cancel()
      childrenAnimations.current.forEach(childAnimation => {
        childAnimation.cancel()
      })
    }
  }, [open]);

  return (
    <div
      ref={menuRef}
      style={{...style, ...menuOffsetStyle}}
      className={c('menu', {
        'open': open
      })}
    >
      <Elevation></Elevation>
      <ul className={'menu__list'} ref={listRef} {...rest}>
        {getChildren()}
      </ul>
    </div>
  )
})

export default Menu;
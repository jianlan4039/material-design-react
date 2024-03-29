import React, {
  CSSProperties,
  forwardRef, HTMLAttributes,
  HTMLProps,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import {BaseProps} from "../internal/common/BaseProps";
import MenuItem, {MenuItemHandle, MenuItemProps} from "./MenuItem";
import {Corner} from "../internal/alignment/geometry";
import {EASING} from "../internal/motion/animation";
import Elevation from "../Elevation";
import './Menu.scss'
import c from 'classnames'
import {alignAnchor} from "./locate";

export interface MenuProps extends BaseProps, HTMLAttributes<HTMLUListElement> {
  items?: MenuItemProps[]
  open?: boolean
  anchorEl?: HTMLElement
  menuAlignCorner?: Corner
  anchorAlignCorner?: Corner
  quick?: boolean
}

export interface MenuHandle extends HTMLProps<HTMLDivElement> {
  root?: HTMLElement | null
}

const Menu = forwardRef<MenuHandle, MenuProps>((props, ref) => {
  const {
    items,
    style,
    open: OPEN,
    anchorAlignCorner = Corner.END_START,
    menuAlignCorner = Corner.START_START,
    anchorEl,
    className,
    quick = false,
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
    return items?.map((item) => {
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
          subMenu={item.subMenu}
          style={style}
          {...item}
        ></MenuItem>
      )
    })
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

  const openMenu = () => {
    setOpen(true)
  }

  const closeMenu = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (menuRef.current && anchorEl) {
      setMenuOffsetStyle(alignAnchor(anchorEl, menuRef.current, anchorAlignCorner, menuAlignCorner))
    }
  }, [menuRef, anchorEl, anchorAlignCorner, menuAlignCorner]);

  useEffect(() => {
    if (OPEN) {
      !open && setOpen(true)
    } else {
      if (open && menuRef.current && listRef.current) {
        !quick ? animateClose(menuRef.current, listRef.current) : closeMenu()
      }
    }
  }, [OPEN]);

  useEffect(() => {
    if (open && menuRef.current && listRef.current) {
      !quick ? animateOpen(menuRef.current, listRef.current) : openMenu()
    } else {
      if (!quick) {
        rootHeightAnimation.current?.cancel()
        rootOpacityAnimation.current?.cancel()
        childrenAnimations.current.forEach(childAnimation => {
          childAnimation.cancel()
        })
      }
    }
  }, [open]);

  useImperativeHandle(ref, () => ({
    root: menuRef.current
  }))

  return (
    <div
      ref={menuRef}
      style={{...style, ...menuOffsetStyle}}
      className={c('menu', className, {
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
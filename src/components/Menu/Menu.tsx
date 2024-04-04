import React, {
  CSSProperties,
  forwardRef,
  HTMLProps,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import MenuItem, {MenuItemHandle, MenuItemProps} from "./MenuItem";
import {Corner} from "../internal/alignment/geometry";
import {EASING} from "../internal/motion/animation";
import Elevation from "../Elevation";
import {alignAnchor} from "./locate";
import {OptionValue} from "./internal/MenuTypes";
import {SelectionContextProvider} from "../internal/context/SelectionContext";
import {BaseProps} from "../internal/common/BaseProps";
import './Menu.scss'
import c from 'classnames'

export interface MenuProps extends BaseProps {
  items?: MenuItemProps[]
  open?: boolean
  anchorEl?: HTMLElement
  menuAlignCorner?: Corner
  anchorAlignCorner?: Corner
  quick?: boolean
  onChange?: (value: OptionValue[]) => void
  offsetX?: number
  offsetY?: number
  stayOpenOnOutsideClick?: boolean
  keepOpen?: boolean
  multiple?: boolean
  onOpening?: () => void
  onOpened?: () => void
  onClosing?: () => void
  onClosed?: () => void
}

export interface MenuHandle extends HTMLProps<HTMLDivElement> {
  root?: HTMLElement | null
}

const Menu = forwardRef<MenuHandle, MenuProps>((props, ref) => {
  const {
    items,
    style,
    open,
    anchorAlignCorner = Corner.END_START,
    menuAlignCorner = Corner.START_START,
    anchorEl,
    className,
    quick = false,
    onChange,
    offsetY,
    offsetX,
    stayOpenOnOutsideClick = false,
    keepOpen = false,
    multiple = false,
    onOpening,
    onOpened,
    onClosing,
    onClosed,
  } = props

  const openDirection = menuAlignCorner.toString().startsWith('end') ? 'UP' : 'DOWN'

  const itemRefs = useRef<HTMLElement[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null)

  const [menuOffsetStyle, setMenuOffsetStyle] = useState<CSSProperties>();

  const [isVisible, setIsVisible] = useState<boolean | undefined>();
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const animationBuffer = useRef<Animation[]>([])
  const [selectedList, setSelectedList] = useState<OptionValue[]>([])

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
          style={style}
          {...item}
        ></MenuItem>
      )
    })
  }

  const animateOpen = async () => {
    const rootEl = menuRef.current
    const list = listRef.current
    if (!rootEl || !list) {
      return;
    }
    const openingUpwards = openDirection === 'UP';
    const FULL_DURATION = 500;
    const OPACITY_DURATION = 50;
    const ITEM_OPACITY_DURATION = 250;
    const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_DURATION) / itemRefs.current.length;
    const {height,} = rootEl.getBoundingClientRect()
    onOpening?.()
    if (quick) {
      setIsAnimating(false)
      onOpened?.()
      return
    }
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

    for (let i = 0; i < itemRefs.current.length; i++) {
      const directionalIndex = openingUpwards ? itemRefs.current.length - 1 - i : i;
      const child = itemRefs.current[directionalIndex]
      const childOpacityAnimation = child.animate({
        opacity: ['0', '1'],
      }, {duration: ITEM_OPACITY_DURATION, delay: DELAY_BETWEEN_ITEMS * i, fill: 'both'})
      animationBuffer.current.push(childOpacityAnimation)
    }
    animationBuffer.current.push(rootHeightAnimation, rootOpacityAnimation, upPositionCorrectionAnimation)
    return await Promise.all([rootHeightAnimation.finished, rootOpacityAnimation.finished, upPositionCorrectionAnimation.finished]).then(() => {
      onOpened?.()
    })
  }

  const animateClose = async () => {
    const rootEl = menuRef.current
    const listEl = listRef.current
    if (!rootEl || !listEl) {
      return;
    }
    const closingDownwards = openDirection === 'UP';
    const FULL_DURATION = 150;
    const OPACITY_DURATION = 50;
    const OPACITY_DELAY = FULL_DURATION - OPACITY_DURATION
    const ITEM_OPACITY_DURATION = 50;
    const ITEM_OPACITY_INITIAL_DELAY = 50;
    const END_HEIGHT_PERCENTAGE = 0.35;
    const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_INITIAL_DELAY - ITEM_OPACITY_DURATION) / itemRefs.current.length;
    const {height,} = rootEl.getBoundingClientRect()
    onClosing?.()
    if (quick) {
      onClosed?.()
      setIsVisible(false)
      setIsAnimating(false)
      return
    }
    const rootHeightAnimation = rootEl.animate({
      height: [`${height}px`, `${height * END_HEIGHT_PERCENTAGE}px`]
    }, {duration: FULL_DURATION, easing: EASING.EMPHASIZED_ACCELERATE, fill: 'forwards'})
    const rootOpacityAnimation = rootEl.animate({
      opacity: ['1', '0']
    }, {duration: OPACITY_DURATION, delay: OPACITY_DELAY, fill: 'forwards'})
    const downPositionCorrectionAnimation = listEl.animate([
      {transform: ''},
      {transform: closingDownwards ? `translateY(-${height * (1 - END_HEIGHT_PERCENTAGE)}px)` : '',},
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
      animationBuffer.current.push(childOpacityAnimation)
    }
    animationBuffer.current.push(rootHeightAnimation, rootOpacityAnimation, downPositionCorrectionAnimation)
    return await Promise.all([rootHeightAnimation.finished, rootOpacityAnimation.finished, downPositionCorrectionAnimation.finished]).then(() => {
      onClosed?.()
    })
  }

  const closeMenu = () => {
    animateClose().then(() => {
      setIsVisible(false)
    })
  }

  const setListWithOption = (list: OptionValue[], option: { close?: boolean }) => {
    setSelectedList(list)
    onChange?.(list)
    if (!keepOpen && option && option.close) {
      closeMenu()
    }
  }

  const clearAnimations = () => {
    const length = animationBuffer.current.length
    for (let i = 0; i < length; i++) {
      const animation = animationBuffer.current.shift()
      animation?.cancel()
    }
  }

  useEffect(() => {
    if (menuRef.current && anchorEl) {
      setMenuOffsetStyle(alignAnchor(anchorEl, menuRef.current, anchorAlignCorner, menuAlignCorner, offsetX, offsetY))
      setIsVisible(false)
    }
  }, [menuRef, anchorEl, anchorAlignCorner, menuAlignCorner]);

  useEffect(() => {
    if (open && !isVisible) {
      setIsVisible(true)
      setIsAnimating(true)
    } else if (!open && isVisible) {
      setIsAnimating(true)
    }
  }, [open]);

  useEffect(() => {
    clearAnimations()
    if (open && isAnimating && isVisible) {
      animateOpen().then(() => {
        setIsAnimating(false)
      })
    } else if (!open && isAnimating && isVisible) {
      animateClose().then(() => {
        setIsAnimating(false)
        setIsVisible(false)
      })
    }
  }, [isAnimating, open])

  useImperativeHandle(ref, () => ({
    root: menuRef.current
  }))

  return (
    <SelectionContextProvider
      multiple={multiple}
      list={selectedList}
      setList={setListWithOption}
    >
      <div
        ref={menuRef}
        style={{...style, ...menuOffsetStyle}}
        className={c('menu', className, {
          'visible': isVisible === true,
          'hidden': isVisible === false
        })}
      >
        <Elevation></Elevation>
        <ul ref={listRef} className={'menu__list'}>
          {getChildren()}
        </ul>
      </div>
    </SelectionContextProvider>
  )
})

export default Menu;
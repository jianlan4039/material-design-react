import React, {
  CSSProperties,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useMemo,
} from 'react'
import MenuItem, {MenuItemHandle, MenuItemProps} from "./MenuItem";
import {Corner} from "../internal/alignment/geometry";
import {EASING} from "../internal/motion/animation";
import Elevation from "../Elevation";
import {alignToAnchor, setPosition} from "../internal/alignment/locate";
import {SelectionContextProvider} from "./internal/context";
import './Menu.scss'
import c from 'classnames'
import {outsideHandler} from "../internal/common/handlers";
import {ListProps} from "../List/List";

type NodeRef = MenuItemHandle | null;

export interface MenuProps extends ListProps {
  items?: MenuItemProps[]
  open?: boolean
  anchorEl?: HTMLElement
  menuCorner?: Corner
  anchorCorner?: Corner
  quick?: boolean
  onSelected?: (ids: string[]) => void
  offsetX?: number
  offsetY?: number
  stayOpenOnOutsideClick?: boolean
  keepOpen?: boolean
  multiple?: boolean
  position?: 'absolute' | 'fixed'
  /**
   * menu will re-render after closed, any preset list passed in will be treated as a new array, which cause menu's
   * selection always be the same. For farther usage, user should keep updating preset by event onSelected when it
   * returns a new selected list.
   */
  preset?: (string | number)[]
  onOpening?: () => void
  onOpened?: () => void
  onClosing?: () => void
  onClosed?: () => void
  scrollConfig?: ScrollIntoViewOptions
}

export interface MenuHandle {
  root?: HTMLDivElement | null
  list?: HTMLOListElement | null
}

const Menu = forwardRef<MenuHandle, MenuProps>((props, ref) => {
  const {
    items,
    style,
    open,
    anchorCorner = Corner.END_START,
    menuCorner = Corner.START_START,
    anchorEl,
    className,
    quick = false,
    onSelected,
    offsetY,
    offsetX,
    stayOpenOnOutsideClick,
    keepOpen = false,
    multiple = false,
    preset,
    position = 'absolute',
    onOpening,
    onOpened,
    onClosing,
    onClosed,
    scrollConfig = {
      block: 'start',
      behavior: 'smooth'
    },
    ...rest
  } = props

  const openDirection = menuCorner.toString().startsWith('end') ? 'UP' : 'DOWN'

  const itemsRef = useRef<NodeRef[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null)

  const [menuOffsetStyle, setMenuOffsetStyle] = useState<CSSProperties>();
  const [isVisible, setIsVisible] = useState<boolean | undefined>();
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const animationBuffer = useRef<Animation[]>([])
  const [selectedList, setSelectedList] = useState<(string | number)[]>()

  useEffect(() => {
    let outsideHandlerCleaner: () => void;
    const clickHandler = (e: MouseEvent) => {
      setMenuOffsetStyle(setPosition(e.pageX, e.pageY))
    }

    if (menuRef.current && anchorEl) {
      if (position === 'absolute') {
        setMenuOffsetStyle(alignToAnchor(anchorEl, menuRef.current, anchorCorner, menuCorner, offsetX, offsetY))
      } else {
        document.addEventListener('click', clickHandler)
      }

      setIsVisible(false)
      if (!stayOpenOnOutsideClick) {
        outsideHandlerCleaner = outsideHandler(menuRef.current, () => {
          setIsOpen(false)
        })
      }
    }

    return () => {
      outsideHandlerCleaner?.()
      document.removeEventListener('click', clickHandler)
    }
  }, [menuRef, anchorEl, anchorCorner, menuCorner]);

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(Boolean(open))
    }
  }, [open]);

  useEffect(() => {
    if (isOpen && !isVisible) {
      setIsVisible(true)
      setIsAnimating(true)
    } else if (!isOpen && isVisible) {
      setIsAnimating(true)
    }
  }, [isOpen]);

  useEffect(() => {
    clearAnimations()
    if (isOpen && isAnimating && isVisible) {
      animateOpen().then(() => {
        setIsAnimating(false)
      })
    } else if (!isOpen && isAnimating && isVisible) {
      animateClose().then(() => {
        setIsAnimating(false)
        setIsVisible(false)
      })
    }
  }, [isAnimating, isOpen])

  useImperativeHandle(ref, () => ({
    root: menuRef.current,
    list: listRef.current,
  }))

  useEffect(() => {
    if (preset) {
      setSelectedList(preset)
    }
  }, [preset]);

  useEffect(() => {
    scrollIntoItem()
  }, [selectedList]);

  const scrollIntoItem = () => {
    if (selectedList && listRef.current) {
      const theFirstId = selectedList[0]
      const theFirstItem = listRef.current.querySelector(`#${theFirstId}`)
      theFirstItem?.scrollIntoView(scrollConfig);
    }
  }

  const animateOpen = async () => {
    const rootEl = menuRef.current
    const list = listRef.current
    if (!rootEl || !list || !items) {
      return;
    }
    const openingUpwards = openDirection === 'UP';
    const FULL_DURATION = 500;
    const OPACITY_DURATION = 50;
    const ITEM_OPACITY_DURATION = 250;
    const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_DURATION) / items.length;
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

    for (let i = 0; i < items.length; i++) {
      const directionalIndex = openingUpwards ? items.length - 1 - i : i;
      const child = itemsRef.current[directionalIndex]
      const childOpacityAnimation = child?.root?.animate({
        opacity: ['0', '1'],
      }, {duration: ITEM_OPACITY_DURATION, delay: DELAY_BETWEEN_ITEMS * i, fill: 'both'})
      childOpacityAnimation && animationBuffer.current.push(childOpacityAnimation)
    }
    animationBuffer.current.push(rootHeightAnimation, rootOpacityAnimation, upPositionCorrectionAnimation)
    return await Promise.all([rootHeightAnimation.finished, rootOpacityAnimation.finished, upPositionCorrectionAnimation.finished]).then(() => {
      onOpened?.()
      scrollIntoItem()
    })
  }

  const animateClose = async () => {
    const rootEl = menuRef.current
    const listEl = listRef.current
    if (!rootEl || !listEl || !items) {
      return;
    }
    const closingDownwards = openDirection === 'UP';
    const FULL_DURATION = 150;
    const OPACITY_DURATION = 50;
    const OPACITY_DELAY = FULL_DURATION - OPACITY_DURATION
    const ITEM_OPACITY_DURATION = 50;
    const ITEM_OPACITY_INITIAL_DELAY = 50;
    const END_HEIGHT_PERCENTAGE = 0.35;
    const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_INITIAL_DELAY - ITEM_OPACITY_DURATION) / items.length;
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
    for (let i = 0; i < itemsRef.current.length; i++) {
      const directionalIndex = closingDownwards ? i : itemsRef.current.length - 1 - i;
      const child = itemsRef.current[directionalIndex];
      const childOpacityAnimation = child?.root?.animate({
        opacity: ['1', '0'],
      }, {
        duration: ITEM_OPACITY_DURATION,
        delay: ITEM_OPACITY_INITIAL_DELAY + DELAY_BETWEEN_ITEMS * i,
        fill: 'forwards'
      })
      childOpacityAnimation && animationBuffer.current.push(childOpacityAnimation)
    }
    animationBuffer.current.push(rootHeightAnimation, rootOpacityAnimation, downPositionCorrectionAnimation)
    return await Promise.all([rootHeightAnimation.finished, rootOpacityAnimation.finished, downPositionCorrectionAnimation.finished]).then(() => {
      onClosed?.()
    })
  }

  const setListWithOption = (list: (string | number) []) => {
    setSelectedList(list)
    onSelected?.(list.map(i => i.toString()))
  }

  const clearAnimations = () => {
    const length = animationBuffer.current.length
    for (let i = 0; i < length; i++) {
      const animation = animationBuffer.current.shift()
      animation?.cancel()
    }
  }

  return (
    <SelectionContextProvider
      config={{multiple: multiple}}
      list={selectedList}
      setList={setListWithOption}
    >
      <div
        ref={menuRef}
        style={{...style, ...menuOffsetStyle}}
        className={c('nd-menu', className, {
          'nd-menu--visible': isVisible === true,
          'nd-menu--hidden': isVisible === false
        })}
      >
        <Elevation></Elevation>
        <ol ref={listRef} className={'nd-menu__list'} {...rest}>
          {
            useMemo(() => {
              return items?.map((item, index) => {
                return (
                  <MenuItem
                    key={`menu-item-${index}-${item.label}`}
                    ref={(node) => itemsRef.current.push(node)}
                    style={style}
                    keepOpen={keepOpen || item.keepOpen}
                    setIsMenuOpen={setIsOpen}
                    {...item}
                  ></MenuItem>
                )
              })
            }, [items])
          }
        </ol>
      </div>
    </SelectionContextProvider>
  )
})

export default Menu;

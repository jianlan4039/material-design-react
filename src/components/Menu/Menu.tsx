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
import MenuItem, {MenuItemHandle} from "./MenuItem";
import {Corner} from "../internal/alignment/geometry";
import {EASING} from "../internal/motion/animation";
import Elevation from "../Elevation";
import {alignAnchor} from "./locate";
import {Option, OptionValue} from "./internal/MenuTypes";
import {SelectionContextProvider} from "../internal/context/SelectionContext";
import {BaseProps} from "../internal/common/BaseProps";
import './Menu.scss'
import c from 'classnames'

export interface MenuProps extends BaseProps {
  items?: Option[]
  open?: boolean
  anchorEl?: HTMLElement
  menuAlignCorner?: Corner
  anchorAlignCorner?: Corner
  quick?: boolean
  onChange?: (value: OptionValue[]) => void
  multiple?: boolean
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
    multiple = false
  } = props

  const openDirection = menuAlignCorner.toString().startsWith('end') ? 'UP' : 'DOWN'

  const itemRefs = useRef<HTMLElement[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null)

  const [menuOffsetStyle, setMenuOffsetStyle] = useState<CSSProperties>();
  const [isVisible, setIsVisible] = useState<boolean | undefined>();
  const [isAnimating, setIsAnimating] = useState(false)
  const animationBuffer = useRef<Animation[]>([])
  const [options, setOptions] = useState<OptionValue[]>([])

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
          start={item.leadingIcon}
          end={item.trailingIcon}
          customOpenIcon={item.customOpenIcon}
          label={item.label}
          subMenu={item.subMenu}
          value={item.value}
        ></MenuItem>
      )
    })
  }

  const animateOpen = (rootEl: HTMLElement, list: HTMLElement, onFinished?: () => void) => {
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

    for (let i = 0; i < itemRefs.current.length; i++) {
      const directionalIndex = openingUpwards ? itemRefs.current.length - 1 - i : i;
      const child = itemRefs.current[directionalIndex]
      const childOpacityAnimation = child.animate({
        opacity: ['0', '1'],
      }, {duration: ITEM_OPACITY_DURATION, delay: DELAY_BETWEEN_ITEMS * i, fill: 'both'})
      animationBuffer.current.push(childOpacityAnimation)
    }

    animationBuffer.current.push(rootHeightAnimation, rootOpacityAnimation, upPositionCorrectionAnimation)

    Promise.all([rootHeightAnimation.finished, rootOpacityAnimation.finished, upPositionCorrectionAnimation.finished]).then(() => {
      onFinished?.()
    })
  }

  const animateClose = (rootEl: HTMLElement, listEl: HTMLElement, onFinished?: () => void) => {
    const closingDownwards = openDirection === 'UP';
    const FULL_DURATION = 150;
    const OPACITY_DURATION = 50;
    const OPACITY_DELAY = FULL_DURATION - OPACITY_DURATION
    const ITEM_OPACITY_DURATION = 50;
    const ITEM_OPACITY_INITIAL_DELAY = 50;
    const END_HEIGHT_PERCENTAGE = 0.35;
    const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_INITIAL_DELAY - ITEM_OPACITY_DURATION) / itemRefs.current.length;

    const {height,} = rootEl.getBoundingClientRect()

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

    Promise.all([rootHeightAnimation.finished, rootOpacityAnimation.finished, downPositionCorrectionAnimation.finished]).then(() => {
      onFinished?.()
    })
  }

  const openMenu = () => {
    setIsVisible(true)
    setIsAnimating(false)
  }

  const closeMenu = () => {
    setIsVisible(false)
    setIsAnimating(false)
  }

  const clearAnimations = () => {
    const length = animationBuffer.current.length
    for (let i = 0; i < length; i++) {
      const animation = animationBuffer.current.pop()
      animation?.cancel()
    }
  }

  useEffect(() => {
    if (menuRef.current && anchorEl) {
      setMenuOffsetStyle(alignAnchor(anchorEl, menuRef.current, anchorAlignCorner, menuAlignCorner))
      setIsVisible(false)
    }
  }, [menuRef, anchorEl, anchorAlignCorner, menuAlignCorner]);

  useEffect(() => {
    if (open && !isVisible) {
      setIsVisible(true)
      setIsAnimating(true)
      if (menuRef.current && anchorEl) {
        setMenuOffsetStyle(alignAnchor(anchorEl, menuRef.current, anchorAlignCorner, menuAlignCorner))
      }
    } else if (!open && isVisible) {
      setIsAnimating(true)
    }
  }, [open]);

  useEffect(() => {
    try {
      if (isAnimating && open && isVisible) {
        !quick ? animateOpen(menuRef.current!, listRef.current!, () => {
          setIsAnimating(false)
        }) : openMenu()
      } else if (isAnimating && !open && isVisible) {
        !quick ? animateClose(menuRef.current!, listRef.current!, () => {
          setIsAnimating(false)
          setIsVisible(false)
        }) : closeMenu()
      } else if (!isAnimating) {
        clearAnimations()
      }
    } catch (e) {
      console.warn(e)
    }
  }, [isAnimating])

  useEffect(() => {
    onChange?.(options)
  }, [options]);

  useImperativeHandle(ref, () => ({
    root: menuRef.current
  }))

  return (
    <SelectionContextProvider
      multiple={false}
      options={options}
      setOption={setOptions}
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
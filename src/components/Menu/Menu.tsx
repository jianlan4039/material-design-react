import React, {forwardRef, HTMLAttributes, ReactNode, useEffect, useRef, CSSProperties, useState, useMemo} from 'react'
import './Menu.scss'
import MenuContent from "./content/MenuContent";
import Elevation from "../Elevation";
import {Corner} from "../internal/alignment/geometry";
import {EASING} from "../internal/motion/animation";

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  anchorEl?: HTMLElement | null
  menuCorner?: string
  anchorCorner?: string
  open?: boolean
}

const Menu = forwardRef<HTMLDivElement, MenuProps>((props: MenuProps, ref) => {
  const {
    children,
    anchorCorner = Corner.END_START,
    menuCorner = Corner.START_START,
    anchorEl,
    style,
    open,
    ...rest
  } = props

  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<CSSProperties | null>()
  const openDirection = useRef<"DOWN" | "UP">();
  const animationAbortController = new AbortController()
  const menuItems = useRef<NodeListOf<Element>>()


  const calcPosition = (menuCorner: string, anchorCorner: string, menu: HTMLElement, anchor: HTMLElement): CSSProperties => {
    const styles: CSSProperties = {}
    const [menuBlockAlign, menuInlineAlign] = menuCorner.split('_')
    const [anchorBlockAlign, anchorInlineAlign] = anchorCorner.split('_')
    const blockAlign = `${menuBlockAlign}_${anchorBlockAlign}`
    const inlineAlign = `${menuInlineAlign}_${anchorInlineAlign}`
    const menuRect = menu.getBoundingClientRect()
    const anchorRect = anchor.getBoundingClientRect()

    switch (blockAlign) {
      case 'start_end':
        const bottomDis = window.innerHeight - anchorRect.bottom
        if (bottomDis > menuRect.height || bottomDis > anchorRect.top && (styles.height = `${bottomDis}px`)) {
          styles.top = `${anchorRect.height}px`
          openDirection.current = 'DOWN'
        } else {
          styles.bottom = `${anchorRect.height}px`
          openDirection.current = 'UP'
        }
        break
      case 'end_end':
        const topDis = anchorRect.bottom
        if (topDis > menuRect.height || topDis > (window.innerHeight - anchorRect.top) && (styles.height = `${topDis}px`)) {
          styles.bottom = `0`
          openDirection.current = 'UP'
        } else {
          styles.top = `0`
          openDirection.current = 'DOWN'
        }
        break
      case 'start_start':
        const bottomDis2 = window.innerHeight - anchorRect.top
        if (bottomDis2 > menuRect.height || bottomDis2 > anchorRect.bottom && (styles.height = `${bottomDis2}px`)) {
          styles.top = `0`
          openDirection.current = 'DOWN'
        } else {
          styles.bottom = `0`
          openDirection.current = 'UP'
        }
        break
      case 'end_start':
        const topDis2 = anchorRect.top
        if (topDis2 > menuRect.height || topDis2 > (window.innerHeight - anchorRect.bottom) && (styles.height = `${topDis2}px`)) {
          styles.bottom = `${anchorRect.height}px`
          openDirection.current = 'UP'
        } else {
          styles.top = `${anchorRect.height}px`
          openDirection.current = 'DOWN'
        }
        break
    }

    switch (inlineAlign) {
      case 'start_end':
        const rightDis = window.innerWidth - anchorRect.right
        if (rightDis > menuRect.width || rightDis > anchorRect.left && (styles.width = `${rightDis}px`)) {
          styles.left = `${anchorRect.width}px`
        } else {
          styles.right = `${anchorRect.width}px`
        }
        break
      case 'end_end':
        const leftDis = anchorRect.left
        if (leftDis > menuRect.width || leftDis > window.innerWidth - anchorRect.left && (styles.width = `${leftDis}px`)) {
          styles.right = `0`
        } else {
          styles.left = `0`
        }
        break
      case 'start_start':
        const rightDis2 = window.innerWidth - anchorRect.left
        if (rightDis2 > menuRect.width || rightDis2 > anchorRect.right && (styles.width = `${rightDis2}px`)) {
          styles.left = `0`
        } else {
          styles.right = `0`
        }
        break
      case 'end_start':
        const leftDis2 = anchorRect.left
        if (leftDis2 > menuRect.width || leftDis2 > window.innerWidth - anchorRect.right && (styles.width = `${leftDis2}px`)) {
          styles.right = `${anchorRect.width}px`
        } else {
          styles.left = `${anchorRect.width}px`
        }
        break
    }
    return styles
  }

  const animateOpen = async (host: HTMLElement, content: HTMLElement, length: number = 1) => {
    const FULL_DURATION = 500;
    const SURFACE_OPACITY_DURATION = 50;
    const ITEM_OPACITY_DURATION = 250;
    const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_DURATION) / length;
    const height = host.offsetHeight
    const children = menuItems.current ?? []

    const surfaceHeightAnimation = host.animate([{height: '0px'}, {height: `${height}px`}], {
      duration: FULL_DURATION,
      easing: EASING.EMPHASIZED,
      fill: 'backwards'
    });

    const upPositionCorrectionAnimation = content.animate([
      {transform: openDirection.current === 'UP' ? `translateY(-${height}px)` : ''},
      {transform: ''},
    ], {duration: FULL_DURATION, easing: EASING.EMPHASIZED});

    const surfaceOpacityAnimation = host.animate([{opacity: 0}, {opacity: 1}], SURFACE_OPACITY_DURATION);

    const childrenAnimations: Animation[] = [];
    for (let i = 0; i < children.length; i++) {
      const directionalIndex = openDirection.current === 'UP' ? children.length - 1 - i : i;
      const child = children[directionalIndex];

      const animation = child.animate([{opacity: 0}, {opacity: 1}], {
        duration: ITEM_OPACITY_DURATION,
        delay: DELAY_BETWEEN_ITEMS * i,
        fill: 'backwards'
      });
      childrenAnimations.push(animation);
    }

    let resolveAnimation: (value: unknown) => void
    const animationFinished = new Promise((resolve) => {
      resolveAnimation = resolve
    })

    surfaceHeightAnimation.addEventListener('finish', () => {
      surfaceHeightAnimation.cancel()
      upPositionCorrectionAnimation.cancel()
      surfaceOpacityAnimation.cancel()
      childrenAnimations.forEach((animation) => {
        animation.cancel()
      })
      resolveAnimation(true)
    })
    return await animationFinished
  }

  const animateClose = async (host: HTMLElement, content: HTMLElement, length: number = 1) => {
    const FULL_DURATION = 150;
    const SURFACE_OPACITY_DURATION = 50;
    const SURFACE_OPACITY_DELAY = FULL_DURATION - SURFACE_OPACITY_DURATION;
    const ITEM_OPACITY_DURATION = 50;
    const ITEM_OPACITY_INITIAL_DELAY = 50;
    const END_HEIGHT_PERCENTAGE = 0.35;
    const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_INITIAL_DELAY - ITEM_OPACITY_DURATION) / length;
    const height = content.offsetHeight
    const children = menuItems.current ?? []

    const surfaceHeightAnimation = host.animate([
      {height: `${height}px`},
      {height: `${height * END_HEIGHT_PERCENTAGE}px`},
    ], {
      duration: FULL_DURATION,
      easing: EASING.EMPHASIZED_ACCELERATE,
    });

    const downPositionCorrectionAnimation = content.animate([
      {transform: ''},
      {
        transform: openDirection.current === 'UP' ? `translateY(-${height * (1 - END_HEIGHT_PERCENTAGE)}px)` : '',
      },
    ], {duration: FULL_DURATION, easing: EASING.EMPHASIZED_ACCELERATE});

    const surfaceOpacityAnimation = host.animate([{opacity: 1}, {opacity: 0}], {
      duration: SURFACE_OPACITY_DURATION,
      delay: SURFACE_OPACITY_DELAY
    });
    const childrenAnimations: Animation[] = [];

    for (let i = 0; i < children.length; i++) {
      const directionalIndex = openDirection.current === 'UP' ? i : children.length - 1 - i;
      const child = children[directionalIndex];
      const animation = child.animate([{opacity: 1}, {opacity: 0}], {
        duration: ITEM_OPACITY_DURATION,
        delay: ITEM_OPACITY_INITIAL_DELAY + DELAY_BETWEEN_ITEMS * i,
      });
      childrenAnimations.push(animation);
    }

    let resolveAnimation: (value: unknown) => void
    const animationFinished = new Promise((resolve) => {
      resolveAnimation = resolve
    })

    surfaceHeightAnimation.addEventListener('finish', () => {
      surfaceHeightAnimation.cancel()
      downPositionCorrectionAnimation.cancel()
      surfaceOpacityAnimation.cancel()
      childrenAnimations.forEach(child => {
        child.cancel()
      })
      resolveAnimation(true)
    })
    return await animationFinished
  }

  useEffect(() => {
    if (anchorEl && menuRef.current && contentRef.current) {
      menuItems.current = contentRef.current.querySelectorAll(':scope>*')
      if (open) {
        menuRef.current.classList.toggle('nd-menu--preparing', true)
        setPosition(calcPosition(menuCorner, anchorCorner, menuRef.current, anchorEl))
        menuRef.current.classList.toggle('nd-menu--prepared', true)
        animateOpen(menuRef.current, contentRef.current, menuItems.current?.length).then(() => {
          menuRef.current!.classList.toggle('nd-menu--preparing', false)
        })
      } else {
        animateClose(menuRef.current, contentRef.current, menuItems.current?.length).then(() => {
          menuRef.current!.classList.toggle('nd-menu--preparing', false)
          menuRef.current!.classList.toggle('nd-menu--prepared', false)
        })
      }
    }
  }, [open]);

  return (
    <div
      ref={menuRef}
      className={'nd-menu'}
      style={{...position, ...style}}
    >
      <Elevation></Elevation>
      <MenuContent ref={contentRef}>
        {children}
      </MenuContent>
    </div>
  )
})

export default Menu
import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  CSSProperties,
  useState,
} from 'react'
import './Menu.scss'
import MenuContent from "./content/MenuContent";
import Elevation from "../Elevation";
import {Corner} from "../internal/alignment/geometry";
import {EASING} from "../internal/motion/animation";

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  anchorEl?: HTMLElement | null
  menuCorner?: Corner
  anchorCorner?: Corner
  open?: boolean
  quick?: boolean
  onClose?: () => void
  stayOpenOnOutsideClick?: boolean
}

type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const Menu = forwardRef<HTMLDivElement, MenuProps>((props: MenuProps, ref) => {
  const {
    children,
    anchorCorner = Corner.END_START,
    menuCorner = Corner.START_START,
    anchorEl,
    style,
    open,
    quick = false,
    onClose,
    onBlur,
    onFocus,
    onMouseDown,
    stayOpenOnOutsideClick,
    ...rest
  } = props

  const menuRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<CSSProperties | null>()
  const openDirection = useRef<"DOWN" | "UP">();
  const animationAbortController = new AbortController()
  const menuItems = useRef<NodeListOf<Element>>()

  function calculateMenuPosition(
    anchor: Position,
    menu: Position,
    anchorCorner: Corner,
    menuCorner: Corner
  ): { top?: string; left?: string; bottom?: string; right?: string } {

    // 获取视口宽度和高度
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 计算锚点组件的角位置
    const anchorCorners = {
      [Corner.START_START]: {x: anchor.x, y: anchor.y},
      [Corner.START_END]: {x: anchor.x + anchor.width, y: anchor.y},
      [Corner.END_END]: {x: anchor.x + anchor.width, y: anchor.y + anchor.height},
      [Corner.END_START]: {x: anchor.x, y: anchor.y + anchor.height},
    };

    // 计算菜单的预期位置
    let menuPosition: { top?: number, left: number, bottom?: number } = {top: 0, left: 0, bottom: 0};
    switch (menuCorner) {
      case Corner.START_START:
        menuPosition = {top: anchorCorners[anchorCorner].y, left: anchorCorners[anchorCorner].x};
        break;
      case Corner.START_END:
        menuPosition = {top: anchorCorners[anchorCorner].y, left: anchorCorners[anchorCorner].x - menu.width};
        break;
      case Corner.END_START:
        menuPosition = {
          bottom: viewportHeight - anchorCorners[anchorCorner].y - menu.height,
          left: anchorCorners[anchorCorner].x - menu.width
        };
        break;
      case Corner.END_END:
        menuPosition = {
          bottom: viewportHeight - anchorCorners[anchorCorner].y - menu.height,
          left: anchorCorners[anchorCorner].x
        };
        break;
    }

    // 调整位置以确保菜单不会超出视口
    if (menuPosition.left < 0) menuPosition.left = 0;
    if (menuPosition.left + menu.width > viewportWidth) menuPosition.left = viewportWidth - menu.width;

    if (menuPosition.top) {
      if (menuPosition.top < 0) menuPosition.top = 0;
      if (menuPosition.top + menu.height > viewportHeight) menuPosition.top = viewportHeight - menu.height;
    }

    if (menuPosition.bottom) {
      if (menuPosition.bottom < 0) menuPosition.bottom = 0;
      if (menuPosition.bottom + menu.height > viewportHeight) menuPosition.bottom = viewportHeight - menu.height
    }

    // 将数字值转换为带'px'的字符串
    const result: { [key: string]: string } = {};
    Object.keys(menuPosition).forEach(key => {
      result[key] = `${menuPosition[key as keyof typeof menuPosition]}px`;
    });

    return result;
  }

  const animateOpen = async (host: HTMLElement, content: HTMLElement, length: number = 1) => {
    const FULL_DURATION = 500;
    const SURFACE_OPACITY_DURATION = 50;
    const ITEM_OPACITY_DURATION = 250;
    const DELAY_BETWEEN_ITEMS = (FULL_DURATION - ITEM_OPACITY_DURATION) / length;
    const height = host.offsetHeight
    const children = menuItems.current ?? []

    let resolveAnimation: (value: unknown) => void
    const animationFinished = new Promise((resolve) => {
      resolveAnimation = resolve
    })

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

    let resolveAnimation: (value: unknown) => void
    const animationFinished = new Promise((resolve) => {
      resolveAnimation = resolve
    })

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

  const toggleOpenAndCloseClass = (open: boolean) => {
    if (open) {
      menuRef.current!.classList.toggle('preparing', false)
    } else {
      menuRef.current!.classList.toggle('preparing', false)
      menuRef.current!.classList.toggle('prepared', false)
    }
  }


  useEffect(() => {
    if (anchorEl && menuRef.current && contentRef.current) {
      menuItems.current = contentRef.current.querySelectorAll(':scope>*')
      menuRef.current.classList.toggle('preparing', true)
      if (open) {
        const menuPosition = calculateMenuPosition(
          {
            x: anchorEl.offsetLeft,
            y: anchorEl.offsetTop,
            width: anchorEl.offsetWidth,
            height: anchorEl.offsetHeight
          },
          {
            x: menuRef.current.offsetLeft,
            y: menuRef.current.offsetTop,
            width: menuRef.current.offsetWidth,
            height: menuRef.current.offsetHeight
          },
          anchorCorner, menuCorner
        )
        setPosition(menuPosition)
        menuRef.current.classList.toggle('prepared', true)
        !stayOpenOnOutsideClick && menuRef.current.focus()
        if (quick) {
          toggleOpenAndCloseClass(true)
        } else {
          animateOpen(menuRef.current, contentRef.current, menuItems.current?.length).then(() => {
            toggleOpenAndCloseClass(true)
          })
        }
      } else {
        if (quick) {
          toggleOpenAndCloseClass(false)
        } else {
          animateClose(menuRef.current, contentRef.current, menuItems.current?.length).then(() => {
            toggleOpenAndCloseClass(false)
          })
        }
      }
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !anchorEl?.contains(event.target as Node) && !menuRef.current.contains(event.target as Node)) {
        !stayOpenOnOutsideClick && onClose?.()
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef, anchorEl]);

  return (
    <div
      tabIndex={stayOpenOnOutsideClick ? -1 : 0}
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
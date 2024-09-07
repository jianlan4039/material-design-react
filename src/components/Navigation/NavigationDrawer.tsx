import React, {ReactNode, useEffect, useRef, useState, MouseEvent, useMemo} from 'react';
import {IndicatorActiveContextProvider} from "../internal/context/IndicatorActiveContext";
import NavigationEnter, {NavigationEnterProps} from "./internal/NavigationEnter";
import {EASING, DURATION} from "../internal/motion/animation";
import Divider from "../Divider/Divider";
import Elevation from "../Elevation";
import './NavigationDrawer.scss';
import c from 'classnames';
import {BaseElement} from "../internal/common/BaseElement";
import List from "../List/List";

export interface Block {
  headline: string
  items?: NavigationEnterProps[]
}

export interface INavigationDrawerProps extends BaseElement {
  children?: ReactNode
  items?: NavigationEnterProps[]
  block?: Block
  modal?: boolean
  show?: boolean
  onClose?: () => void
  stayOpenOnOutsideClick?: boolean
  active?: string
}

export default function NavigationDrawer(props: INavigationDrawerProps) {
  const {
    children,
    items,
    block,
    modal,
    show,
    stayOpenOnOutsideClick = false,
    onClose,
    active,
    className,
    style
  } = props

  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLUListElement>(null);
  const animationBuff = useRef<Animation[]>([]);

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isAnimating, setIsAnimating] = useState<boolean | undefined>(undefined)

  const Items = useMemo(() => {
    return items?.map((enter, index) => {
      return (
        <NavigationEnter key={enter.id ?? `nav-enter-${index}`} {...enter} ></NavigationEnter>
      )
    })
  }, [items])

  const Blocks = useMemo(() => {
    if (!block) return;
    const {headline, items} = block
    return (
      <>
        <h3 className={'headline'}>{headline}</h3>
        {
          items?.map((enter, index) => {
            return (
              <NavigationEnter key={enter.id ?? `nav-enter-${index}`} {...enter} ></NavigationEnter>
            )
          })
        }
        <Divider variant={'inset'}></Divider>
      </>
    )
  }, [block])

  useEffect(() => {
    if (dialogRef.current && modal) {
      if (show && !isVisible) {
        dialogRef.current!.showModal()
        void animatingOpen()
      } else if (!show && isVisible) {
        void animatingClose()
      } else if (!show || !isVisible) {
        dialogRef.current!.close()
      }
    } else if (!modal && dialogRef.current) {
      dialogRef.current.show()
    }
  }, [show, isVisible, modal]);

  useEffect(() => {
    if (isAnimating === false) {
      cleanAnimation()
    }
  }, [isAnimating]);

  const animatingOpen = async () => {
    if (!contentRef.current || !scrimRef.current) {
      return
    }
    setIsAnimating(true)
    const {width} = contentRef.current.getBoundingClientRect()
    const {paddingInline} = contentRef.current.style
    const contentAnimation = contentRef.current.animate([
      {inlineSize: 0, paddingInline: 0, opacity: 0},
      {inlineSize: `${width}px`, paddingInline: `${paddingInline}`, opacity: 1}
    ], {easing: EASING.EMPHASIZED, duration: DURATION.DURATION_MEDIUM1, fill: "backwards"})
    const scrimAnimation = scrimRef.current.animate([
      {opacity: 0},
      {opacity: 0.4}
    ], {easing: EASING.EMPHASIZED, duration: DURATION.DURATION_MEDIUM2, fill: 'backwards'})
    animationBuff.current.push(contentAnimation, scrimAnimation)
    await Promise.all([contentAnimation.finished, scrimAnimation.finished]).then(() => {
      setIsAnimating(false)
      setIsVisible(true)
    })
  }

  const animatingClose = async () => {
    if (!contentRef.current || !scrimRef.current) {
      return
    }
    setIsAnimating(true)
    const {width} = contentRef.current.getBoundingClientRect()
    const {paddingInline} = contentRef.current.style
    const contentAnimation = contentRef.current.animate([
      {inlineSize: `${width}px`, paddingInline: `${paddingInline}`, opacity: 1},
      {inlineSize: 0, paddingInline: 0, opacity: 0},
    ], {easing: EASING.EMPHASIZED_ACCELERATE, duration: DURATION.DURATION_MEDIUM1, fill: "forwards"})

    const scrimOpacityAnimation = scrimRef.current.animate([
      {opacity: 0.4},
      {opacity: 0},
    ], {easing: EASING.EMPHASIZED, duration: DURATION.DURATION_MEDIUM2, fill: 'forwards'})
    animationBuff.current.push(contentAnimation, scrimOpacityAnimation)
    await Promise.all([contentAnimation.finished, scrimOpacityAnimation.finished]).then(() => {
      setIsAnimating(false)
      setIsVisible(false)
      onClose?.()
    })
  }

  const controlledClose = () => {
    void animatingClose()
  }

  const cleanAnimation = () => {
    const length = animationBuff.current.length
    for (let i = 0; i < length; i++) {
      const animation = animationBuff.current.shift()
      animation?.cancel()
    }
  }

  const scrimClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (!stayOpenOnOutsideClick) {
      controlledClose()
    }
  };

  return (
    <IndicatorActiveContextProvider active={active}>
      <dialog ref={dialogRef} className={c('nd-navigation-drawer', className, {'modal': modal})} style={style}>
        <Elevation></Elevation>
        <List ref={contentRef}>
          {Items || Blocks || children}
        </List>
        {modal && <div ref={scrimRef} className={c('navigation-drawer-scrim')} onClick={scrimClickHandler}></div>}
      </dialog>
    </IndicatorActiveContextProvider>
  )
}
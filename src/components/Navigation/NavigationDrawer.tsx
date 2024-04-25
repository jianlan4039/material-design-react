import React, {ReactNode, useEffect, useRef, useState, MouseEvent} from 'react'
import {IndicatorRectContextProvider} from "../internal/context/indicator";
import './NavigationDrawer.scss'
import NavigationEnter, {NavigationEnterProps} from "./internal/NavigationEnter";
import Divider from "../Divider/Divider";
import c from 'classnames'
import Elevation from "../Elevation";
import {EASING, DURATION} from "../internal/motion/animation";

export interface Block {
  headline: string
  items?: NavigationEnterProps[]
}

export interface NavigationDrawerProps {
  children?: ReactNode
  items?: NavigationEnterProps[]
  block?: Block
  modal?: boolean
  show?: boolean
  onClose?: () => void
  stayOpenOnOutsideClick?: boolean
}

export default function NavigationDrawer(props: NavigationDrawerProps) {
  const {
    children,
    items,
    block,
    modal,
    show,
    stayOpenOnOutsideClick = false,
    onClose,
    ...rest
  } = props

  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLUListElement>(null);
  const animationBuff = useRef<Animation[]>([]);

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  useEffect(() => {
    if (dialogRef.current) {
      if (show) {
        setIsVisible(true)
        setIsAnimating(true)
      } else if (!show && isVisible) {
        setIsAnimating(true)
      }
    }
  }, [show]);

  useEffect(() => {
    if (isAnimating && show) {
      animatingOpen()
    } else if (isAnimating && !show && isVisible) {
      animatingClose()
    } else if (!isAnimating) {
      cleanAnimation()
    }
  }, [isAnimating]);

  useEffect(() => {
    if (!isVisible) {
      cleanAnimation()
    }
  }, [isVisible]);

  const Content = () => {
    return (
      <ul ref={contentRef} className={c('navigation-drawer', {'modal': modal})}>
        {modal && <Elevation></Elevation>}
        {
          items?.map((enter, index) => {
            return (
              <NavigationEnter key={index} {...enter} ></NavigationEnter>
            )
          })
        }
        {
          block && <>
            <h3 className={'headline'}>{block.headline}</h3>
            {
              block.items?.map((enter, index) => {
                return (
                  <NavigationEnter key={index} {...enter} ></NavigationEnter>
                )
              })
            }
            <Divider variant={'inset'}></Divider>
          </>
        }
        {children}
      </ul>
    )
  }

  const animatingOpen = async () => {
    if (!contentRef.current || !scrimRef.current) {
      return
    }
    dialogRef.current!.showModal()
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
    })
  }

  const animatingClose = async () => {
    if (!contentRef.current || !scrimRef.current) {
      return
    }
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
      dialogRef.current!.close()
      onClose?.()
    })
  }

  const controlledClose = () => {
    animatingClose()
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
    <IndicatorRectContextProvider>
      <div className={c('navigation-drawer-container')}>{
        modal ?
          <dialog ref={dialogRef} className={c('navigation-drawer-dialog')}>
            <Content></Content>
            <div ref={scrimRef} className={c('navigation-drawer-scrim')} onClick={scrimClickHandler}></div>
          </dialog> :
          <Content></Content>
      }</div>
    </IndicatorRectContextProvider>
  )
}
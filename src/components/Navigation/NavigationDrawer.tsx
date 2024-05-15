import React, {ReactNode, useEffect, useRef, useState, MouseEvent, useId} from 'react'
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

export interface INavigationDrawerProps {
  children?: ReactNode
  items?: NavigationEnterProps[]
  block?: Block
  modal?: boolean
  show?: boolean
  onClose?: () => void
  stayOpenOnOutsideClick?: boolean
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
    ...rest
  } = props

  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLUListElement>(null);
  const animationBuff = useRef<Animation[]>([]);

  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isAnimating, setIsAnimating] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (dialogRef.current && modal) {
      if (show && !isVisible) {
        dialogRef.current!.showModal()
        animatingOpen()
      } else if (!show && isVisible) {
        animatingClose()
      } else if (!show || !isVisible) {
        dialogRef.current!.close()
      }
    } else if (!modal && dialogRef.current) {
      dialogRef.current.show()
    }
  }, [show, isVisible]);

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
    console.log(width)
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
    console.log(width)
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
      <div className={c('navigation-drawer-container')}>
        <dialog ref={dialogRef} className={c('navigation-drawer-dialog')}>
          <ul ref={contentRef} className={c('navigation-drawer', {'modal': modal})}>
            {modal && <Elevation></Elevation>}
            {
              items?.map((enter, index) => {
                return (
                  <NavigationEnter key={enter.id ?? `nav-enter-${index}`} {...enter} ></NavigationEnter>
                )
              })
            }
            {
              block &&
              <>
                <h3 className={'headline'}>{block.headline}</h3>
                {
                  block.items?.map((enter, index) => {
                    return (
                      <NavigationEnter key={enter.id ?? `nav-enter-${index}`} {...enter} ></NavigationEnter>
                    )
                  })
                }
                <Divider variant={'inset'}></Divider>
              </>
            }
            {children}
          </ul>
          {modal && <div ref={scrimRef} className={c('navigation-drawer-scrim')} onClick={scrimClickHandler}></div>}
        </dialog>
      </div>
    </IndicatorRectContextProvider>
  )
}
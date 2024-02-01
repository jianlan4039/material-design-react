import React, {ReactNode, useEffect, useRef} from 'react'
import './Drawer.scss'
import {EASING} from "../internal/motion/animation";

type AnimationOptions = number | KeyframeAnimationOptions | undefined

export interface DrawerProps {
  children?: ReactNode
  position: [number, number]
  to: 'DOWNWARD' | "UPWARD" | 'LEFT' | 'RIGHT'
  selfAdapt?: boolean,
  open?: boolean
  onClose?: () => void
  openAnimationOptions?: AnimationOptions
  closeAnimationOptions?: AnimationOptions
}

export default function Drawer(props: DrawerProps) {
  const {
    children,
    position,
    to,
    open,
    onClose,
    selfAdapt = true,
    openAnimationOptions = {
      easing: EASING.EMPHASIZED,
      duration: 500
    },
    closeAnimationOptions = {
      easing: EASING.EMPHASIZED_ACCELERATE,
      duration: 150
    },
    ...rest
  } = props

  const ref = useRef<HTMLDivElement>(null);

  function getFrames(rect: DOMRect) {
    let startFrame: Keyframe = {}
    let endFrame: Keyframe = {}

    switch (to) {
      case "DOWNWARD":
        startFrame['bottom'] = rect.top + 'px'
        endFrame['bottom'] = rect.top + rect.height + 'px'
        break;
      case "UPWARD":
        startFrame['top'] = rect.bottom + 'px'
        endFrame['top'] = rect.bottom - rect.height + 'px'
        break;
      case "LEFT":
        startFrame['left'] = rect.right + 'px'
        endFrame['left'] = rect.right - rect.width + 'px'
        break;
      case "RIGHT":
        startFrame['right'] = rect.left + 'px'
        endFrame['right'] = rect.left + rect.width + 'px'
        break;
    }
    return {startFrame, endFrame};
  }

  const animateOpen = async (self: HTMLDivElement) => {
    self.classList.toggle('open', true)
    const rect = self.getBoundingClientRect()
    let {startFrame, endFrame} = getFrames(rect);
    const openAnimation = self.animate([
      startFrame, endFrame
    ], openAnimationOptions)
    const opacityAnimation = self.animate([
      {opacity: 0}, {opacity: 1}
    ], 50)
    await Promise.all([openAnimation, opacityAnimation])
    self.focus();
  }

  const animateClose = async (self: HTMLDivElement) => {
    const rect = self.getBoundingClientRect()
    let {startFrame, endFrame} = getFrames(rect)
    const closeAnimation = self.animate([
      endFrame, startFrame
    ], closeAnimationOptions)
    await closeAnimation.finished
    self.classList.toggle('open', false)
  }

  const blurHandler = () => {
    animateClose(ref.current!).then(onClose)
  }

  useEffect(() => {
    if (open && ref.current) {
      void animateOpen(ref.current)
    }
  }, []);

  return (
    <div
      ref={ref}
      tabIndex={0}
      className={'nd-drawer'}
      onBlur={blurHandler}
      {...rest}
    >
      {children}
    </div>
  )
}
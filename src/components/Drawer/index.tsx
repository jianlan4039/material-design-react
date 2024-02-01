import React, {ReactNode, useEffect, useRef} from 'react'
import cln from "classnames";
import './Drawer.scss'
import {EASING} from "../internal/motion/animation";

type AnimationOptions = number | KeyframeAnimationOptions | undefined

export interface DrawerProps {
  children?: ReactNode
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

  function getFrames(el: HTMLDivElement) {
    let startFrame: Keyframe = {}
    let endFrame: Keyframe = {}
    const rect = el.getBoundingClientRect()

    switch (to) {
      case "UPWARD":
      case "DOWNWARD":
        startFrame['height'] = 0
        endFrame['height'] = rect.height + 'px'
        break;
      case "LEFT":
      case "RIGHT":
        startFrame['width'] = 0
        endFrame['width'] = rect.width + 'px'
        break;
    }
    return {startFrame, endFrame};
  }

  const animateOpen = async (self: HTMLDivElement) => {
    self.classList.toggle('drawer--open', true)
    let {startFrame, endFrame} = getFrames(self);
    const openAnimation = self.animate([
      startFrame, endFrame
    ], openAnimationOptions);
    const opacityAnimation = self.animate([
      {opacity: 0}, {opacity: 1}
    ], 50)
    await Promise.all([openAnimation, opacityAnimation])
    self.focus();
  }

  const animateClose = async (self: HTMLDivElement) => {
    let {startFrame, endFrame} = getFrames(self)
    const closeAnimation = self.animate([
      endFrame, startFrame
    ], closeAnimationOptions)
    await closeAnimation.finished
    self.classList.toggle('drawer--open', false)
  }

  const blurHandler = () => {
    animateClose(ref.current!).then(onClose)
  }

  useEffect(() => {
    if (ref.current) {
      if (open) {
        void animateOpen(ref.current)
      } else {
        void animateClose(ref.current)
      }
    }
  }, [open]);

  return (
    <div
      ref={ref}
      tabIndex={0}
      className={cln('nd-drawer', {
        'drawer--downward': to === 'DOWNWARD',
        'drawer--upward': to === 'UPWARD',
        'drawer--left': to === 'LEFT',
        'drawer--right': to === 'RIGHT'
      })}
      // onBlur={blurHandler}
      {...rest}
    >
      {children}
    </div>
  )
}
import React, {ReactNode, useEffect, useRef, useState} from 'react';
import './SlideViewer.scss'
import c from "classnames";
import {DURATION, EASING} from "../internal/motion/animation";

export interface ISlideViewerProps {
  children?: ReactNode
  alternativeView?: ReactNode
  direction?: 'right' | 'left'
}

const SlideViewer: React.FC<ISlideViewerProps> = (
  {
    children,
    alternativeView,
    direction,
  }
) => {

  const mainViewRef = useRef<HTMLDivElement>(null);
  const secViewRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [prevView, setPrevView] = useState<ReactNode>(children)
  const [currentView, setCurrentView] = useState<ReactNode>(children)
  const animationBuff = useRef<Animation[]>([]);

  useEffect(() => {
    if (alternativeView && !isAnimating) {
      setPrevView(currentView)
      setCurrentView(alternativeView)
      setIsAnimating(true)
    } else if(alternativeView && isAnimating){
      animateSliding()
    }
  }, [alternativeView]);

  useEffect(() => {
    if (isAnimating) {
      animateSliding()
    } else {
      cleanAnimations()
    }
  }, [isAnimating]);

  const cleanAnimations = () => {
    animationBuff.current.forEach(a => a?.cancel())
    animationBuff.current = []
  }

  const animateSliding = () => {
    if (!mainViewRef.current || !secViewRef.current) {
      return
    }
    let transformStart = ''
    let transformEnd = ''
    if (direction === 'left') {
      transformStart = `translateX(100%)`
      transformEnd = `translateX(-100%)`
    } else {
      transformStart = `translateX(-100%)`
      transformEnd = `translateX(100%)`
    }
    const mainAnimation = mainViewRef.current.animate([
      {transform: transformStart},
      {transform: 'translateX(0px)'}
    ], {duration: DURATION.DURATION_SHORT4, easing: EASING.EMPHASIZED})
    // mainAnimation.playbackRate = 0.1
    animationBuff.current.push(mainAnimation)

    const secAnimation = secViewRef.current.animate([
      {transform: 'translateX(0px)'},
      {transform: transformEnd}
    ], {duration: DURATION.DURATION_SHORT4, easing: EASING.EMPHASIZED, fill: 'forwards'})
    // secAnimation.playbackRate = 0.1
    animationBuff.current.push(secAnimation)

    Promise.all([mainAnimation.finished, secAnimation.finished]).then(() => {
      setIsAnimating(false)
    })
  }

  return (
    <div className={'slide-viewer'}>
      <div
        ref={secViewRef}
        className={c('viewer sec-view', {
          'animating': isAnimating
        })}
      >
        {prevView}
      </div>
      <div
        ref={mainViewRef}
        className={c('viewer main-view')}
      >
        {currentView}
      </div>

    </div>
  )
}

export default SlideViewer
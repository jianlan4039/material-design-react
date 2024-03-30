import React, {useRef, useEffect} from 'react'
import {EASING} from "../internal/motion/animation";
import cln from "classnames";
import './StateLayer.scss'

export interface StateLayerProps {
  disabled?: boolean
  forceHover?: boolean
  forcePressed?: boolean
}

const StateLayer = (props: StateLayerProps) => {
  const {
    disabled,
    forceHover,
    forcePressed,
  } = props

  const PRESS_GROW_MS = 450;
  const MINIMUM_PRESS_MS = 225;
  const INITIAL_ORIGIN_SCALE = 0.2;
  const PADDING = 10;
  const SOFT_EDGE_MINIMUM_SIZE = 75;
  const SOFT_EDGE_CONTAINER_RATIO = 0.35;
  const EASE_STANDARD = EASING.STANDARD
  const ANIMATION_FILL = 'forwards';

  let rippleScale = '';
  let initialSize = 0;

  const surfaceRef = useRef<HTMLSpanElement>(null);
  const growAnimation = useRef<Animation>();
  let pageX: number, pageY: number

  function getNormalizedPointerEventCoords(rect: DOMRect) {
    const {scrollX, scrollY} = window;
    const {left, top} = rect;
    const documentX = scrollX + left;
    const documentY = scrollY + top;
    // const {pageX, pageY} = e;
    return {x: pageX - documentX, y: pageY - documentY};
  }

  function determineRippleSize(rect: DOMRect) {
    const {height, width} = rect;
    const maxDim = Math.max(height, width);
    const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);
    const _initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
    const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
    const maxRadius = hypotenuse + PADDING;
    initialSize = _initialSize;
    rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`;
  }

  function getTranslationCoordinates(rect: DOMRect) {
    const {height, width} = rect
    // end in the center
    const endPoint = {
      x: (width - initialSize) / 2,
      y: (height - initialSize) / 2,
    };
    let startPoint = getNormalizedPointerEventCoords(rect)
    // center around start point
    startPoint = {
      x: startPoint.x - (initialSize / 2),
      y: startPoint.y - (initialSize / 2),
    };
    return {startPoint, endPoint};
  }

  async function startPressAnimation(e: MouseEvent, rect: DOMRect) {
    pageX = e.pageX;
    pageY = e.pageY;
    determineRippleSize(rect);
    const {startPoint, endPoint} = getTranslationCoordinates(rect);
    const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
    const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
    growAnimation.current = surfaceRef.current?.animate(
      {
        top: [0, 0],
        left: [0, 0],
        height: [initialSize + 'px', initialSize + 'px'],
        width: [initialSize + 'px', initialSize + 'px'],
        transform: [
          `translate(${translateStart}) scale(1)`,
          `translate(${translateEnd}) scale(${rippleScale})`,
        ],
      },
      {
        pseudoElement: '::after',
        duration: PRESS_GROW_MS,
        easing: EASE_STANDARD,
        fill: ANIMATION_FILL,
      })
  }

  async function endPressAnimation() {
    const pressAnimationPlayState = growAnimation.current?.currentTime as number
    if (pressAnimationPlayState > MINIMUM_PRESS_MS) {
      return
    }
    return await new Promise(resolve => {
      setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
    });
  }

  const mouseOverHandler = () => {
    if (!disabled) {
      surfaceRef.current!.classList.toggle('hover', true)
    }
  }

  const mouseOutHandler = () => {
    if (!disabled) {
      surfaceRef.current!.classList.toggle('hover', false)
      surfaceRef.current!.classList.toggle('pressed', false)
    }
  }

  const mouseDownHandler = (e: MouseEvent) => {
    if (!disabled && surfaceRef.current) {
      endPressAnimation().then(() => {
        surfaceRef.current && startPressAnimation(e, surfaceRef.current.getBoundingClientRect()).then(() => {
          surfaceRef.current!.classList.toggle('pressed', true)
        })
      })
    }
  }

  const mouseUpHandler = () => {
    if (!disabled) {
      surfaceRef.current!.classList.toggle('pressed', false)
    }
  }

  useEffect(() => {
    if (surfaceRef.current && surfaceRef.current.parentElement) {
      surfaceRef.current.parentElement.addEventListener('mouseover', mouseOverHandler)
      surfaceRef.current.parentElement.addEventListener('mouseout', mouseOutHandler)
      surfaceRef.current.parentElement.addEventListener('mousedown', mouseDownHandler)
      surfaceRef.current.parentElement.addEventListener('mouseup', mouseUpHandler)
    }

    return () => {
      if (surfaceRef.current && surfaceRef.current.parentElement) {
        surfaceRef.current.parentElement.removeEventListener('mouseover', mouseOverHandler)
        surfaceRef.current.parentElement.removeEventListener('mouseout', mouseOutHandler)
        surfaceRef.current.parentElement.removeEventListener('mousedown', mouseDownHandler)
        surfaceRef.current.parentElement.removeEventListener('mouseup', mouseUpHandler)
      }
    }
  }, [surfaceRef.current, disabled]);

  return (
    <span
      ref={surfaceRef}
      className={cln('nd-state-layer', {
        'disabled': disabled,
        'force-hover': forceHover,
        'force-pressed': forcePressed
      })}
    ></span>
  )
}

export default StateLayer
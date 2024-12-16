import React, {
  MouseEvent as ReactMouseEvent,
  TouchEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import {EASING} from "../internal/motion/animation";
import './Ripple.scss'
import classNames from "classnames";

export interface RippleProps {
  children?: React.ReactNode
  disabled?: boolean
}

interface ClickPoint {
  x: number;
  y: number;
}

export default function Ripple(props: RippleProps) {
  const {
    children,
    disabled
  } = props

  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
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

  const surfaceRef = useRef<HTMLDivElement>(null);
  const growAnimation = useRef<Animation>();

  const [isHover, setIsHover] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const surfaceRect = useRef<DOMRect>();
  const clickPoint = useRef<ClickPoint>()


  useLayoutEffect(() => {
    if(!surfaceRef.current) return;
    surfaceRect.current = surfaceRef.current!.getBoundingClientRect();
  }, [surfaceRef.current]);

  useEffect(() => {
    if(!surfaceRect.current || !clickPoint.current || !isPressed) return
    startPressAnimation(clickPoint.current.x, clickPoint.current.y, surfaceRect.current)
  }, [isPressed]);

  function getNormalizedPointerEventCoords(rect: DOMRect, x: number, y: number) {
    const {scrollX, scrollY} = window;
    const {left, top} = rect;
    const documentX = scrollX + left;
    const documentY = scrollY + top;
    return {x: x - documentX, y: y - documentY};
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

  function getTranslationCoordinates(rect: DOMRect, x: number, y: number) {
    const {height, width} = rect
    const endPoint = {
      x: (width - initialSize) / 2,
      y: (height - initialSize) / 2,
    };
    let startPoint = getNormalizedPointerEventCoords(rect, x, y)
    startPoint = {
      x: startPoint.x - (initialSize / 2),
      y: startPoint.y - (initialSize / 2),
    };
    return {startPoint, endPoint};
  }

  function startPressAnimation(pageX: number, pageY: number, rect: DOMRect) {
    endPressAnimation()
    determineRippleSize(rect);
    const {startPoint, endPoint} = getTranslationCoordinates(rect, pageX, pageY);
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

  function endPressAnimation() {
    const pressAnimationPlayState = growAnimation.current?.currentTime as number
    if (pressAnimationPlayState > MINIMUM_PRESS_MS) {
      return
    }
    growAnimation.current?.cancel()
  }

  const mouseDownHandler = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!surfaceRef.current || disabled) return;
    clickPoint.current = {x: e.clientX, y: e.clientY}
    setIsPressed(true)
  }

  const mouseUpHandler = () => {
    setIsPressed(false)
  }

  const mouseEnterHandler = () => {
    if(disabled) return;
    setIsHover(true)
  }

  const mouseLeaveHandler = () => {
    setIsHover(false)
    setIsPressed(false)
  }

  function touchStartHandler(e: TouchEvent<HTMLDivElement>) {
    if(disabled) return;
    clickPoint.current = {x: e.touches[0].clientX, y: e.touches[0].clientY,}
    setIsPressed(true)
  }

  function touchEndHandler() {
    setIsPressed(false)
  }

  return (
    <div
      ref={surfaceRef}
      aria-hidden={true}
      className={classNames('nd-ripple', {
        'hover': isHover,
        'pressed': isPressed
      })}
      onMouseEnter={!isTouchDevice ? mouseEnterHandler: undefined}
      onMouseLeave={!isTouchDevice ? mouseLeaveHandler: undefined}
      onMouseDown={!isTouchDevice ? mouseDownHandler : undefined}
      onMouseUp={!isTouchDevice ? mouseUpHandler: undefined}
      onTouchStart={isTouchDevice ? touchStartHandler: undefined}
      onTouchEnd={isTouchDevice? touchEndHandler: undefined}
    >
      {children}
    </div>
  )
}
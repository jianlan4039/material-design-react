import React, {
  ComponentType,
  forwardRef,
  HTMLAttributes,
  MouseEvent as ReactMouseEvent,
  useRef,
  useState
} from 'react'
import {EASING} from "../internal/motion/animation";
import cln from "classnames";
import './StateLayer.scss'
import {StateElement} from "../internal/common/StateElement";

export interface StateLayerProps {
  interactive?: boolean
}


function StateLayer<R, T extends HTMLAttributes<Element> & StateElement>(Parent: ComponentType<T>) {
  return forwardRef<R, T & StateLayerProps>((props, ref) => {
    const {
      interactive = true,
      children,
      stateLayer,
      onMouseDown,
      onMouseUp,
      onMouseOver,
      onMouseOut,
      ...rest
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

    const [isHover, setIsHover] = useState(false)
    const [isPressed, setIsPressed] = useState(false)

    let pageX: number, pageY: number;

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

    async function startPressAnimation(e: ReactMouseEvent, rect: DOMRect) {
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

    function endPressAnimation() {
      const pressAnimationPlayState = growAnimation.current?.currentTime as number
      if (pressAnimationPlayState > MINIMUM_PRESS_MS) {
        return
      }
      growAnimation.current?.cancel()
    }

    const mouseDownHandler = (e: ReactMouseEvent) => {
      onMouseDown?.(e)
      if (interactive && surfaceRef.current) {
        endPressAnimation()
        startPressAnimation(e, surfaceRef.current.getBoundingClientRect()).then(() => {
          setIsPressed(true)
        })
      }
    }

    const mouseUpHandler = (e: ReactMouseEvent) => {
      onMouseUp?.(e)
      setIsPressed(false)
    }

    const mouseEnterHandler = (e: ReactMouseEvent) => {
      onMouseOver?.(e)
      if (interactive) {
        setIsHover(true)
      }
    }

    const mouseLeaveHandler = (e: ReactMouseEvent) => {
      onMouseOut?.(e)
      if (interactive) {
        setIsHover(false)
        setIsPressed(false)
      }
    }

    return (
      <Parent
        ref={ref}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        stateLayer={
          interactive && <span
            ref={surfaceRef}
            className={cln('nd-state-layer', {
              'hover': isHover,
              'pressed': isPressed
            })}
          ></span>
        }
        {...rest as T}
      >
        {children}
      </Parent>
    )
  })
}

export default StateLayer
import React, {
  ComponentType,
  forwardRef,
  HTMLAttributes,
  MouseEvent as ReactMouseEvent, useEffect,
  TouchEvent,
  useRef,
  useState
} from 'react'
import {EASING} from "../internal/motion/animation";
import cln from "classnames";
import './StateLayer.scss'
import {StateElement} from "../internal/common/StateElement";

function withStateLayer<T extends HTMLAttributes<HTMLElement> & StateElement>(Parent: ComponentType<T>) {
  return forwardRef<HTMLElement, T>((props, ref) => {
    const {
      children,
      stateLayer,
      onMouseDown,
      onMouseUp,
      onMouseOver,
      onMouseOut,
      ...rest
    } = props

    const PRESS_GROW_MS = 450;
    // const MINIMUM_PRESS_MS = 225;
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

    const [isTouchEvent, setIsTouchEvent] = useState(false)
    const touchEventRecoverTimeId = useRef<NodeJS.Timeout>();
    const [isHover, setIsHover] = useState(false)
    const [isPressed, setIsPressed] = useState(false)
    const mouseEventRef = useRef<ReactMouseEvent | TouchEvent>();
    const pageXRef = useRef<number>(0);
    const pageYRef = useRef<number>(0);


    useEffect(() => {
      if (isPressed && mouseEventRef.current && surfaceRef.current) {
        if (!isTouchEvent) {
          const {pageX, pageY} = mouseEventRef.current as ReactMouseEvent
          const rect = surfaceRef.current.getBoundingClientRect()
          startPressAnimation(pageX, pageY, rect)
        } else {
          const {touches} = mouseEventRef.current as TouchEvent
          const {pageX, pageY} = touches[0]
          const rect = surfaceRef.current.getBoundingClientRect()
          startPressAnimation(pageX, pageY, rect)
        }
      }
    }, [isPressed]);

    function getNormalizedPointerEventCoords(rect: DOMRect) {
      const {scrollX, scrollY} = window;
      const {left, top} = rect;
      const documentX = scrollX + left;
      const documentY = scrollY + top;
      return {x: pageXRef.current - documentX, y: pageYRef.current - documentY};
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
      const endPoint = {
        x: (width - initialSize) / 2,
        y: (height - initialSize) / 2,
      };
      let startPoint = getNormalizedPointerEventCoords(rect)
      startPoint = {
        x: startPoint.x - (initialSize / 2),
        y: startPoint.y - (initialSize / 2),
      };
      return {startPoint, endPoint};
    }

    function startPressAnimation(pageX: number, pageY: number, rect: DOMRect) {
      pageXRef.current = pageX
      pageYRef.current = pageY
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

    // function endPressAnimation() {
    //   const pressAnimationPlayState = growAnimation.current?.currentTime as number
    //   if (pressAnimationPlayState > MINIMUM_PRESS_MS) {
    //     return
    //   }
    //   growAnimation.current?.cancel()
    // }

    const mouseDownHandler = (e: ReactMouseEvent) => {
      if (!surfaceRef.current || isTouchEvent) {
        return
      }
      mouseEventRef.current = e
      setIsPressed(true)
    }

    const mouseUpHandler = () => {
      if (isTouchEvent) {
        return
      }
      setIsPressed(false)
    }

    const mouseEnterHandler = () => {
      if (isTouchEvent) {
        return
      }
      setIsHover(true)
    }

    const mouseLeaveHandler = () => {
      if (isTouchEvent) {
        return
      }
      setIsHover(false)
      setIsPressed(false)
    }

    function touchStartHandler(e: TouchEvent<HTMLDivElement>) {
      clearTimeout(touchEventRecoverTimeId.current)
      mouseEventRef.current = e
      setIsTouchEvent(true)
      setIsPressed(true)
      touchEventRecoverTimeId.current = setTimeout(() => {
        setIsTouchEvent(false)
        setIsPressed(false)
      }, 1000)
    }

    function touchEndHandler() {
      setIsPressed(false)
    }


    return (
      <Parent
        ref={ref}
        onMouseOver={mouseEnterHandler}
        onMouseOut={mouseLeaveHandler}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onTouchStart={touchStartHandler}
        onTouchEnd={touchEndHandler}
        stateLayer={
          <span
            ref={surfaceRef}
            aria-hidden={true}
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

export default withStateLayer
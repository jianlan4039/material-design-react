import React, {ReactNode, useRef, MouseEvent, useState} from 'react'
import cln from 'classnames'
import './StateLayer.scss'

export interface StateLayerProps {
  children?: ReactNode
  disabled?: boolean
}

export default function StateLayer(props: StateLayerProps) {
  const {
    children,
    disabled,
    ...rest
  } = props

  const PRESS_GROW_MS = 450;
  const MINIMUM_PRESS_MS = 225;
  const INITIAL_ORIGIN_SCALE = 0.2;
  const PADDING = 10;
  const SOFT_EDGE_MINIMUM_SIZE = 75;
  const SOFT_EDGE_CONTAINER_RATIO = 0.35;
  const EASE_STANDARD = 'cubic-bezier(0.2, 0, 0, 1)'
  const ANIMATION_FILL = 'forwards';

  let rippleScale = '';
  let initialSize = 0;
  const [hover, setHover] = useState(false)
  const [pressed, setPressed] = useState(false)

  const surfaceElement = useRef<HTMLDivElement>(null);
  const growAnimation = useRef<Animation>();

  function getNormalizedPointerEventCoords(e: MouseEvent<HTMLElement>) {
    const self = e.currentTarget
    const {scrollX, scrollY} = window;
    const {left, top} = self.getBoundingClientRect();
    const documentX = scrollX + left;
    const documentY = scrollY + top;
    const {pageX, pageY} = e;
    return {x: pageX - documentX, y: pageY - documentY};
  }

  function determineRippleSize(e: HTMLSpanElement) {
    const {height, width} = e.getBoundingClientRect();
    const maxDim = Math.max(height, width);
    const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);
    const _initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
    const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
    const maxRadius = hypotenuse + PADDING;
    initialSize = _initialSize;
    rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`;
  }

  function getTranslationCoordinates(e: MouseEvent<HTMLElement>) {
    const self = e.currentTarget
    const {height, width} = self.getBoundingClientRect();
    // end in the center
    const endPoint = {
      x: (width - initialSize) / 2,
      y: (height - initialSize) / 2,
    };
    let startPoint = getNormalizedPointerEventCoords(e)
    // center around start point
    startPoint = {
      x: startPoint.x - (initialSize / 2),
      y: startPoint.y - (initialSize / 2),
    };
    return {startPoint, endPoint};
  }

  async function startPressAnimation(e: MouseEvent<HTMLDivElement>) {
    determineRippleSize(e.currentTarget);
    const {startPoint, endPoint} = getTranslationCoordinates(e);
    const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
    const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
    growAnimation.current = surfaceElement.current?.animate(
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
      setPressed(false);
      return
    }
    await new Promise(resolve => {
      setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
    });
  }

  const mouseDownHandler = (e: MouseEvent<HTMLDivElement>) => {
    setPressed(true)
    startPressAnimation(e).then(Promise.resolve)
  }

  const mouseUpHandler = () => {
    endPressAnimation().then(() => {
      setPressed(false)
    })
  }

  const mouseOverHandler = () => {
    setHover(true)
  }

  const mouseOutHandler = () => {
    setHover(false)
    setPressed(false)
  }


  return (
    <div
      ref={surfaceElement}
      className={cln('nd-state-layer', {
        'nd-state-layer--disabled': disabled,
        'hover': hover,
        'pressed': pressed
      })}
      onMouseDown={mouseDownHandler}
      onMouseUp={mouseUpHandler}
      onMouseOut={mouseOutHandler}
      onMouseOver={mouseOverHandler}
    >
      {children}
    </div>
  )
}
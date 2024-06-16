import React, {forwardRef, HTMLAttributes, ReactNode, useEffect, useRef, useState, MouseEvent, HTMLProps} from 'react'
import TextButton, {TextButtonHandle} from "../Button/TextButton";
import './Snackbar.scss'
import c from 'classnames'
import IconButton from "../IconButton/IconButton";
import {EASING, DURATION} from "../internal/motion/animation";
import useRipple from "../Ripple/useRipple";

export interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  supportingText?: string
  label?: string
  closeable?: boolean
  icon?: ReactNode
  offsetY?: number
  show?: boolean
  quick?: boolean
}

export interface SnackbarHandle extends HTMLProps<HTMLDivElement> {
  root?: ReactNode
}

const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>((props, ref) => {
  const {
    supportingText,
    label,
    closeable,
    icon,
    onMouseDown,
    onMouseUp,
    onMouseOut,
    onMouseOver,
    onTouchStart,
    onTouchEnd,
    className,
    style,
    offsetY = 60,
    show,
    quick,
  } = props

  const actionRef = useRef<TextButtonHandle>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const animationBuffer = useRef<Animation[]>([])

  const [isActionWrapped, setIsActionWrapped] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean | undefined>()
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  const [rippleProps, ripple] = useRipple<HTMLDivElement>({
    onMouseOver, onMouseOut, onMouseDown, onMouseUp, onTouchStart, onTouchEnd
  })

  useEffect(() => {
    if (rootRef.current && actionRef.current?.button) {
      setIsActionWrapped(actionRef.current.button?.getBoundingClientRect().width > 100)
      setIsVisible(false)
    }
  }, [rootRef, actionRef]);

  useEffect(() => {
    quick ? setIsVisible(Boolean(show)) : animateShow(Boolean(show))
  }, [show]);

  useEffect(() => {
    if (isAnimating && show) {
      animateOpen()
    } else if (isAnimating && !show && isVisible) {
      animateClose()
    } else {
      const animation = animationBuffer.current.shift()
      animation?.cancel()
    }
  }, [isAnimating, show]);

  const btnMouseOverHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  };
  const btnMouseOutHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  };
  const btnMouseDownHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  };
  const btnMouseUpHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  };

  const closeHandler = () => {
    //todo: fire close event
  }

  const animateShow = (show: boolean) => {
    if (show) {
      setIsVisible(true)
      setIsAnimating(true)
    } else {
      setIsAnimating(true)
    }
  }

  const animateOpen = () => {
    if (quick || !rootRef.current) {
      setIsVisible(true)
      return
    }

    const {height} = rootRef.current.getBoundingClientRect()
    const opacityAnimation = rootRef.current.animate([
      {opacity: '0', blockSize: '0',},
      {opacity: '1', blockSize: `${height}px`}
    ], {duration: DURATION.DURATION_MEDIUM1, easing: EASING.EMPHASIZED_ACCELERATE})
    const heightAnimation = rootRef.current.animate([
      {blockSize: '0', insetBlockEnd: `-${height}px`},
      {blockSize: `${height}px`, insetBlockEnd: `${offsetY}px`}
    ], {duration: DURATION.DURATION_MEDIUM1, easing: EASING.EMPHASIZED_DECELERATE})
    animationBuffer.current.push(opacityAnimation)
    animationBuffer.current.push(heightAnimation)
    opacityAnimation.addEventListener('finish', () => {
      setIsAnimating(false)
    })
  }

  const animateClose = () => {
    if (!rootRef.current) {
      return
    }
    const duration = quick ? 0 : DURATION.DURATION_MEDIUM1
    const {height} = rootRef.current.getBoundingClientRect()
    const animation = rootRef.current.animate([
      {opacity: '1', blockSize: `${height}px`, insetBlockEnd: `${offsetY}px`},
      {opacity: '0', blockSize: '0', insetBlockEnd: `-${height}px`},
    ], {duration: duration, easing: EASING.EMPHASIZED_ACCELERATE, fill: 'forwards'})
    animationBuffer.current.push(animation)

    animation.addEventListener('finish', () => {
      setIsVisible(false)
      setIsAnimating(false)
    })
  }

  return (
    <div
      ref={rootRef}
      className={c('snackbar', className, {
        'action-wrapped': isActionWrapped,
        'visible': isVisible === true
      })}
      style={{insetBlockEnd: `${offsetY}px`, ...style}}
      {...rippleProps}
    >
      {ripple}
      <div className={'supporting-text-container'}>
        <div className={'supporting-text'}>{supportingText}</div>
      </div>
      {
        label &&
        <div className={'action-container'}>
          <TextButton
            ref={actionRef}
            className={c('action')}
          >
            {label}
          </TextButton>
        </div>
      }
      {
        closeable &&
        <div
          className={c('close-container')}
          onClick={closeHandler}
        >
          <IconButton
            onMouseOver={btnMouseOverHandler}
            onMouseOut={btnMouseOutHandler}
            onMouseDown={btnMouseDownHandler}
            onMouseUp={btnMouseUpHandler}
          >
            {
              icon ||
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path
                  d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
              </svg>
            }
          </IconButton>
        </div>
      }
    </div>
  )
})

export default Snackbar;
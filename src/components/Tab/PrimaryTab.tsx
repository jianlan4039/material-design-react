import React, {
  forwardRef,
  ReactNode,
  useContext,
  useEffect,
  useState,
  MouseEvent,
  HTMLAttributes,
  useRef,
  useId
} from 'react'
import './PrimaryTab.scss'
import {IndicatorRectContext} from "../internal/context/indicator";
import {EASING} from "../internal/motion/animation";
import useRipple from "../Ripple/useRipple";

export interface PrimaryTabProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  icon?: ReactNode
  text?: string
  active?: boolean
  inline?: boolean
}

const PrimaryTab = forwardRef<HTMLDivElement, PrimaryTabProps>((props, ref) => {
  const {
    children,
    icon,
    text,
    active,
    inline,
    onClick,
    onMouseOver,
    onMouseOut,
    onMouseUp,
    onMouseDown,
    onTouchStart,
    onTouchEnd,
    ...rest
  } = props

  const id = useId()
  const {current, last, setCurrent, init} = useContext(IndicatorRectContext)
  const [isActive, setIsActive] = useState<boolean>(false)

  const indicator = useRef<HTMLSpanElement>(null);

  const [rippleProps, ripple] = useRipple<HTMLDivElement>({
    onMouseOver, onMouseOut, onMouseDown, onMouseUp, onTouchStart, onTouchEnd
  })

  const animateIndicating = () => {
    if (!indicator.current || !last?.rect) {
      return
    }
    const {left: translateFrom, width: scaleFrom} = last.rect
    const {left: translateTo, width: scaleTo} = indicator.current.getBoundingClientRect()
    const scale = scaleFrom / scaleTo

    if (translateFrom !== undefined && translateTo !== undefined && !isNaN(scale)) {
      const translateAnimate = indicator.current.animate([
        {transform: `translateX(${(translateFrom - translateTo).toFixed(4)}px) scaleX(${scale.toFixed(4)})`},
        {transform: `none`}
      ], {duration: 250, fill: 'backwards', easing: EASING.EMPHASIZED})

      translateAnimate.addEventListener('finish', () => {
        translateAnimate.cancel()
      })
    }
  }

  const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
    onClick?.(e)
    if (indicator.current) {
      setCurrent?.({rect: indicator.current.getBoundingClientRect(), id: id})
    }
  }

  /**
   * For the first child of tabs, active the first tab
   */
  useEffect(() => {
    if (indicator.current) {
      init?.({rect: indicator.current.getBoundingClientRect(), id: id}, active)
    }
  })

  useEffect(() => {
    setIsActive(current?.id === id)
  }, [current]);

  useEffect(() => {
    if (isActive) {
      animateIndicating()
    }
  }, [isActive]);

  return (
    <div
      ref={ref}
      className={`tab primary-tab ${isActive && 'primary-tab--active'} ${icon && 'tab--with-icon'}`}
      onClick={clickHandler}
      {...rippleProps}
      {...rest}
    >
      {ripple}
      <div className={`tab__presentation ${inline && 'tab__presentation--inline'}`}>
        {icon && <div className={'tab__presentation__icon'}>{icon}</div>}
        {text && <div className={'tab__presentation__text'}>{text}</div>}
        <span
          ref={indicator}
          className={`tab__indicator primary-tab__indicator ${isActive ? 'tab__indicator--active' : ''}`}></span>
      </div>
    </div>
  )
})

export default PrimaryTab;
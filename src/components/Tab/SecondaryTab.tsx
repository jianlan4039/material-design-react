import React, {
  forwardRef,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useContext,
  useEffect,
  useId,
  useRef,
  useState
} from 'react'
import {IndicatorRectContext} from "../internal/context/indicator";
import {EASING} from "../internal/motion/animation";
import {StateElement} from "../internal/common/StateElement";
import FocusRing from "../Focus/FocusRing";
import './SecondaryTab.scss'
import useRipple from "../Ripple/useRipple";

export interface SecondaryTabProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  icon?: ReactNode
  text?: string
  inline?: boolean
  active?: boolean
}

const SecondaryTab = forwardRef<HTMLDivElement, SecondaryTabProps>((props, ref) => {
  const {
    children,
    icon,
    text,
    active,
    inline,
    onClick,
    onMouseOver,
    onMouseOut,
    onMouseDown,
    onMouseUp,
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
    const {left: translateFrom} = last.rect
    const {left: translateTo} = indicator.current.getBoundingClientRect()

    if (translateFrom !== undefined && translateTo !== undefined) {
      const translateAnimate = indicator.current.animate([
        {transform: `translateX(${(translateFrom - translateTo).toFixed(4)}px)`},
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
      className={`tab secondary-tab ${isActive && 'secondary-tab--active'} ${icon && 'tab--with-icon'}`}
      onClick={clickHandler}
      {...rippleProps}
      {...rest}
    >
      <FocusRing></FocusRing>
      {ripple}
      <div className={`tab__presentation ${inline && 'tab__presentation--inline'}`}>
        {icon && <div className={'tab__presentation__icon'}>{icon}</div>}
        {text && <div className={'tab__presentation__text'}>{text}</div>}
      </div>
      <span
        ref={indicator}
        className={`tab__indicator secondary-tab__indicator ${isActive && 'tab__indicator--active'}`}></span>
    </div>
  )
})

export default SecondaryTab;
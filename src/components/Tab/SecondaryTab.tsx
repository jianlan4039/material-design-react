import React, {
  forwardRef,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useContext,
  useEffect,
  useId, useImperativeHandle,
  useRef,
  useState
} from 'react'
import {IndicatorRectContext} from "../internal/context/indicator";
import {EASING} from "../internal/motion/animation";
import './SecondaryTab.scss'
import useRipple from "../Ripple/useRipple";
import useFocusRing from "../Focus/useFocusRing";

export interface SecondaryTabProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  icon?: ReactNode
  text?: string
  inline?: boolean
  active?: boolean
}

export interface SecondaryTabHandle {
  tab?: HTMLDivElement | null
}

const SecondaryTab = forwardRef<SecondaryTabHandle, SecondaryTabProps>((props, ref) => {
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
    onBlur,
    onFocus,
    ...rest
  } = props

  const id = useId()
  const {current, last, setCurrent, init} = useContext(IndicatorRectContext)
  const [isActive, setIsActive] = useState<boolean>(false)
  const indicator = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [parent, setParent] = useState<HTMLDivElement>()

  const [rippleProps, ripple] = useRipple<HTMLDivElement>({
    onMouseOver, onMouseOut, onMouseDown, onMouseUp, onTouchStart, onTouchEnd
  })
  const [focusRingProps, focusRing] = useFocusRing<HTMLDivElement>({parent, onFocus, onBlur})

  /**
   * For the first child of tabs, active the first tab
   */
  useEffect(() => {
    if (indicator.current) {
      init?.({rect: indicator.current.getBoundingClientRect(), id: id}, active)
    }
  }, [indicator])

  useEffect(() => {
    if (wrapperRef.current) {
      setParent(wrapperRef.current)
    }
  }, [wrapperRef]);

  useEffect(() => {
    setIsActive(current?.id === id)
  }, [current]);

  useEffect(() => {
    if (isActive) {
      animateIndicating()
    }
  }, [isActive]);

  useImperativeHandle(ref, () => ({
    tab: wrapperRef.current
  }))

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

  return (
    <div
      ref={wrapperRef}
      className={`tab secondary-tab ${isActive && 'secondary-tab--active'} ${icon && 'tab--with-icon'}`}
      onClick={clickHandler}
      tabIndex={0}
      {...rippleProps}
      {...focusRingProps}
      {...rest}
    >
      {focusRing}
      {ripple}
      <div className={`tab__presentation ${inline && 'tab__presentation--inline'}`}>
        {icon && <div className={'tab__presentation__icon'}>{icon}</div>}
        {text && <div className={'tab__presentation__text'}>{text}</div>}
      </div>
      <span
        ref={indicator}
        className={`tab__indicator secondary-tab__indicator ${isActive && 'tab__indicator--active'}`}
      ></span>
    </div>
  )
})

export default SecondaryTab;
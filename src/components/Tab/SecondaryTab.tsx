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
import withStateLayer from "../StateLayer";
import FocusRing from "../Focus/FocusRing";
import './SecondaryTab.scss'

export interface SecondaryTabProps extends StateElement, HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  icon?: ReactNode
  text?: string
  inline?: boolean
  active?: boolean
}

const SecondaryTab = withStateLayer<HTMLDivElement, SecondaryTabProps>(forwardRef<HTMLDivElement, SecondaryTabProps>((props, ref) => {
  const {
    children,
    stateLayer,
    icon,
    text,
    active,
    inline,
    onClick,
    ...rest
  } = props

  const id = useId()
  const {current, last, setCurrent, init} = useContext(IndicatorRectContext)
  const [isActive, setIsActive] = useState<boolean>(false)

  const indicator = useRef<HTMLSpanElement>(null);

  const animateIndicating = () => {
    if (!indicator.current || !last) {
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
      {...rest}
    >
      <FocusRing></FocusRing>
      {stateLayer}
      <div className={`tab__presentation ${inline && 'tab__presentation--inline'}`}>
        {icon && <div className={'tab__presentation__icon'}>{icon}</div>}
        {text && <div className={'tab__presentation__text'}>{text}</div>}
      </div>
      <span
        ref={indicator}
        className={`tab__indicator secondary-tab__indicator ${isActive && 'tab__indicator--active'}`}></span>
    </div>
  )
}))

export default SecondaryTab;
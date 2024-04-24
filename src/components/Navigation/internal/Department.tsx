import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useContext,
  MouseEvent,
  useId,
  useEffect,
  useRef,
  useState
} from 'react'
import './Department.scss'
import Indicator from "./Indicator";
import {IndicatorRectContext} from '../../internal/context/indicator'
import {EASING, DURATION} from "../../internal/motion/animation";

export interface DepartmentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  icon: ReactNode
  label?: string
  badge?: 'small' | 'large' | 'none'
  badgeCount?: number
  id?: string
  active?: boolean
}

const Department = forwardRef<HTMLDivElement, DepartmentProps>((props, ref) => {
  const {
    children,
    icon,
    label,
    badge,
    badgeCount,
    className = '',
    id = useId(),
    active,
    ...rest
  } = props

  const {init, setCurrent, last, current} = useContext(IndicatorRectContext)
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  useEffect(() => {
    if (indicatorRef.current) {
      init?.({rect: indicatorRef.current.getBoundingClientRect(), id: id}, active)
    }
  }, [indicatorRef]);

  useEffect(() => {
    setIsActive(current?.id === id)
  }, [current]);

  useEffect(() => {
    if (isActive) {
      animatingIndicator()
      setIsAnimating(true)
    }
  }, [isActive]);

  const animatingIndicator = () => {
    if (!last || !current || !indicatorRef.current) {
      return
    }

    const {top: lastTop, left: lastLeft} = last.rect
    const {top: currentTop, left: currentLeft} = current.rect

    const indicatorAnimation = indicatorRef.current.animate([
      {translate: `${lastLeft - currentLeft}px ${lastTop - currentTop}px`},
      {translate: `none`}
    ], {duration: DURATION.DURATION_MEDIUM1, easing: EASING.EMPHASIZED, pseudoElement: "::before"})
    indicatorAnimation.addEventListener('finish', () => {
      indicatorAnimation.cancel()
      setIsAnimating(false)
    })
  }

  const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
    setCurrent?.({rect: e.currentTarget.getBoundingClientRect(), id: id})
  };

  return (
    <div
      className={`navigation-department ${className}`}
      onClick={clickHandler}
    >
      <Indicator ref={indicatorRef} animating={isAnimating} active={isActive}></Indicator>
      <div className={'icon'}>
        {icon}
      </div>
      {
        label &&
        <div className={'label'}>
          {label}
        </div>
      }
    </div>
  )
})

export default Department;
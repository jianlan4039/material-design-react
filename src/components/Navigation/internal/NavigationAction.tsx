import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useContext,
  MouseEvent,
  useEffect,
  useRef,
  useState
} from 'react'
import './NavigationAction.scss'
import Indicator from "./Indicator";
import {IndicatorActiveContext} from '../../internal/context/IndicatorActiveContext'

export interface DepartmentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  icon: ReactNode
  label?: string
  badge?: 'small' | 'large' | 'none'
  badgeCount?: number
  id: string
  showLabel?: boolean
}

const NavigationAction = forwardRef<HTMLDivElement, DepartmentProps>((props, ref) => {
  const {
    icon,
    label,
    className = '',
    id,
    showLabel = true
  } = props

  const {setActive, previous, active} = useContext(IndicatorActiveContext)
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)

  useEffect(() => {
    setIsActive(active?.id === id)
  }, [active]);

  const clickHandler = (e: MouseEvent<HTMLDivElement>) => {
    setActive?.({target: e.currentTarget, id: id})
  };

  return (
    <div ref={ref} className={`navigation-action ${className}`}>
      <Indicator ref={indicatorRef} animating={isAnimating} active={isActive} onClick={clickHandler}></Indicator>
      <div className={'icon'}>{icon}</div>
      {showLabel && label && <div className={'label'}>{label}</div>}
    </div>
  )
})

export default NavigationAction;
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
import {IndicatorActiveContext} from '../../internal/context/IndicatorActiveContext'

export interface DepartmentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  icon: ReactNode
  label?: string
  badge?: 'small' | 'large' | 'none'
  badgeCount?: number
  id?: string
  showLabel?: boolean
}

const Department = forwardRef<HTMLDivElement, DepartmentProps>((props, ref) => {
  const {
    icon,
    label,
    className = '',
    id = useId(),
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
    <div ref={ref} className={`navigation-department ${className}`}>
      <Indicator ref={indicatorRef} animating={isAnimating} active={isActive} onClick={clickHandler}></Indicator>
      <div className={'icon'}>{icon}</div>
      {showLabel && label && <div className={'label'}>{label}</div>}
    </div>
  )
})

export default Department;
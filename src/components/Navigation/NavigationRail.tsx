import React, {forwardRef, ReactNode, useMemo} from 'react'
import './NavigationRail.scss';
import NavigationAction, {DepartmentProps} from "./internal/NavigationAction";
import {IndicatorActiveContextProvider} from "../internal/context/IndicatorActiveContext";
import IconButton from "../IconButton/IconButton";

export interface NavigationRailProps {
  children?: ReactNode
  icon?: ReactNode
  items?: DepartmentProps[]
  labelType?: 'none' | 'selected' | 'all'
  active?: string
}

const NavigationRail = forwardRef<HTMLDivElement, NavigationRailProps>((props, ref) => {
  const {
    children,
    icon,
    items,
    active,
  } = props

  const Items = useMemo(() => {
    return items?.map((item, index) => {
      return (
        <NavigationAction key={item.id ?? `nav-rail-${index}`} {...item}></NavigationAction>
      )
    })
  }, [items])

  return (
    <IndicatorActiveContextProvider active={active}>
      <div ref={ref} className={'navigation-rail-container'}>
        <div className={'navigation-rail'}>
          {icon && <IconButton>{icon}</IconButton>}
          {Items || children}
        </div>
      </div>
    </IndicatorActiveContextProvider>
  )
})

export default NavigationRail;
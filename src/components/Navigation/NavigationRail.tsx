import React, {forwardRef, ReactNode} from 'react'
import './NavigationRail.scss';
import Department, {DepartmentProps} from "./internal/Department";
import {IndicatorRectContextProvider} from "../internal/context/indicator";
import IconButton from "../IconButton/IconButton";

export interface NavigationRailProps {
  children?: ReactNode
  icon?: ReactNode
  items?: DepartmentProps[]
}

const NavigationRail = forwardRef<HTMLDivElement, NavigationRailProps>((props, ref) => {
  const {
    children,
    icon,
    items
  } = props

  return (
    <IndicatorRectContextProvider>
      <div ref={ref} className={'navigation-rail-container'}>
        <div className={'navigation-rail'}>
          {icon && <IconButton>{icon}</IconButton>}
          {
            items?.map((item, index) => {
              return (
                <Department key={item.id ?? `nav-rail-${index}`} {...item}></Department>
              )
            })
          }
          {children}
        </div>
      </div>
    </IndicatorRectContextProvider>
  )
})

export default NavigationRail;
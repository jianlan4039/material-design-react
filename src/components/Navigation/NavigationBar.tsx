import React, {forwardRef, ReactNode, useMemo} from 'react'
import './NavigationBar.scss'
import NavigationAction from "./internal/NavigationAction";
import {IndicatorActiveContextProvider} from "../internal/context/IndicatorActiveContext";

export type Item = {
  label?: string
  icon?: ReactNode
  id?: string
}

export interface NavigationBarProps {
  children?: ReactNode
  items?: Item[]
  order?: number
  active?: string
}

const NavigationBar = forwardRef<HTMLDivElement, NavigationBarProps>((props, ref) => {
  const {
    items,
    children,
    active,
  } = props

  const Items = useMemo(() => {
    return items?.map((o, i) => {
      return <NavigationAction icon={o.icon} label={o.label} key={i} id={o.id}></NavigationAction>
    })
  }, [items])

  return (
    <IndicatorActiveContextProvider active={active}>
      <div
        ref={ref}
        className={'navigation-bar container'}
      >
        {Items || children}
      </div>
    </IndicatorActiveContextProvider>
  )
})

export default NavigationBar;
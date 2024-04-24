import React, {forwardRef, ReactNode} from 'react'
import './NavigationBar.scss'
import Department from "./internal/Department";
import {IndicatorRectContextProvider} from "../internal/context/indicator";

export type Item = {
  label?: string
  icon?: ReactNode
  id?: string
  active?: boolean
}

export interface NavigationBarProps {
  children?: ReactNode
  items?: Item[]
  order?: number
}

const NavigationBar = forwardRef<HTMLDivElement, NavigationBarProps>((props, ref) => {
  const {
    children,
    items,
    order = 0,
    ...rest
  } = props

  const Items = () => {
    return items?.map((o, i) => {
      return <Department icon={o.icon} label={o.label} key={i} id={o.id} active={o.active}></Department>
    })
  }

  return (
    <IndicatorRectContextProvider>
      <div
        ref={ref}
        className={'navigation-bar container'}
      >
        <Items/>
      </div>
    </IndicatorRectContextProvider>
  )
})

export default NavigationBar;
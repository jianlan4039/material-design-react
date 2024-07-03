import React, {forwardRef, ReactNode, useEffect, useRef, useState} from 'react'
import './Tabs.scss'
import Divider from "../Divider/Divider";
import {Target, IndicatorActiveContext} from "../internal/context/IndicatorActiveContext";

export interface TabsProps {
  children?: ReactNode
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
    children,
    ...rest
  } = props

  const [current, setCurrent] = useState<Target>()
  const [last, setLast] = useState<Target>()
  const currentBuffer = useRef<Target>();

  const init = (newCurrent: Target, force?: boolean) => {
    if (!currentBuffer.current || force) {
      currentBuffer.current = newCurrent
    }
  }

  const setCurrentAndLast = (newCurrent: Target) => {
    setLast(current)
    setCurrent(newCurrent)
  }

  useEffect(() => {
    if (currentBuffer.current && !current) {
      setCurrent(currentBuffer.current)
      setLast(currentBuffer.current)
    }
  })

  return (
    <IndicatorActiveContext.Provider value={{active: current, previous: last, setActive: setCurrentAndLast}}>
      <div ref={ref} className={'nd-tabs'} {...rest}>
        {children}
        <Divider/>
      </div>
    </IndicatorActiveContext.Provider>
  )
})

export default Tabs;
import React, {forwardRef, ReactNode, useEffect, useRef, useState} from 'react'
import './Tabs.scss'
import Divider from "../Divider/Divider";
import {CurrentIndicator, IndicatorRectContext} from "../internal/context/indicator";

export interface TabsProps {
  children?: ReactNode
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
    children,
    ...rest
  } = props

  const [current, setCurrent] = useState<CurrentIndicator>()
  const [last, setLast] = useState<CurrentIndicator>()
  const currentBuffer = useRef<CurrentIndicator>();

  const init = (newCurrent: CurrentIndicator, force?: boolean) => {
    if (!currentBuffer.current || force) {
      currentBuffer.current = newCurrent
    }
  }

  const setCurrentAndLast = (newCurrent: CurrentIndicator) => {
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
    <IndicatorRectContext.Provider value={{current, last, setCurrent: setCurrentAndLast, init}}>
      <div ref={ref} className={'nd-tabs'} {...rest}>
        {children}
        <Divider/>
      </div>
    </IndicatorRectContext.Provider>
  )
})

export default Tabs;
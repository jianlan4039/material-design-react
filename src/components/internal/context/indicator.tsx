import {createContext, CSSProperties, ReactNode, useEffect, useRef, useState} from "react";

export type CurrentIndicator = { rect: DOMRect, id: string };

export interface IndicatorOperation {
  last?: CurrentIndicator
  current?: CurrentIndicator
  setCurrent?: (current: CurrentIndicator) => void
  init?: (current: CurrentIndicator, force?: boolean) => void
}

export const IndicatorRectContext = createContext<IndicatorOperation>({})

export const IndicatorRectContextProvider = ({children}: { children?: ReactNode }) => {
  const [last, setLast] = useState<CurrentIndicator>()
  const [current, setCurrent] = useState<CurrentIndicator>()
  const currentBuffer = useRef<CurrentIndicator>();

  useEffect(() => {
    if (currentBuffer.current && !current) {
      setCurrent(currentBuffer.current)
      setLast(currentBuffer.current)
    }
  })

  const init = (newCurrent: CurrentIndicator, force?: boolean) => {
    if (!currentBuffer.current || force) {
      currentBuffer.current = newCurrent
    }
  }

  const setCurrentAndLast = (newCurrent: CurrentIndicator) => {
    setLast(current)
    setCurrent(newCurrent)
  }

  return <IndicatorRectContext.Provider value={{last, current, setCurrent: setCurrentAndLast, init}}>
    {children}
  </IndicatorRectContext.Provider>
}

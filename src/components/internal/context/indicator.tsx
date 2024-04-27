import {createContext, ReactNode, useState} from "react";

export type CurrentIndicator = { rect?: DOMRect, id: string };

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


  const setCurrentAndLast = (newCurrent: CurrentIndicator) => {
    setLast(current)
    setCurrent(newCurrent)
  }

  return <IndicatorRectContext.Provider value={{last, current, setCurrent: setCurrentAndLast}}>
    {children}
  </IndicatorRectContext.Provider>
}

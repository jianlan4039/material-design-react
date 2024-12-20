import React, {createContext, ReactNode, useEffect, useState} from "react";

export type Target = {
  target?: HTMLElement,
  id: string,
  value?: string | number | readonly string[] | undefined
};

export interface IndicatorOperation {
  previous?: Target
  active?: Target
  options?: any
  setActive?: (target: Target) => void
}

export const IndicatorActiveContext = createContext<IndicatorOperation>({})

export const IndicatorActiveContextProvider = ({children, active: _active, onChange}: {
  children?: ReactNode,
  active?: string,
  onChange?: (target: Target) => void
}) => {
  const [previous, setPrevious] = useState<Target>()
  const [active, setActive] = useState<Target>()

  useEffect(() => {
    if (_active) {
      handleActive({id: _active})
    }
  }, [_active]);

  const handleActive = (newOne: Target) => {
    setPrevious(active)
    setActive(newOne)
    onChange?.(newOne)
  }

  return (
    <IndicatorActiveContext.Provider value={{previous: previous, active: active, setActive: handleActive}}>
      {children}
    </IndicatorActiveContext.Provider>
  )
}

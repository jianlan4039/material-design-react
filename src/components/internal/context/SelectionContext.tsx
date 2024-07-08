import React, {createContext, ReactNode} from 'react';

export type SelectionContextConfig = {
  multiple: boolean
  [key: string]: any
}

export interface ISelectionContext<T> {
  list?: Array<T>
  setList?: (list: Array<T>) => void
  config: SelectionContextConfig
}

type ContextProps<T> = ISelectionContext<T> & { children: React.ReactNode }

export function createSelectionContextProvider<T>():
  [React.Context<ISelectionContext<T>>, (props: ContextProps<T>) => ReactNode] {
  const SelectionContext = createContext<ISelectionContext<T>>({config: {multiple: false}})
  return [
    SelectionContext,
    ({children, list, setList, config}: ContextProps<T>) => {
      return (
        <SelectionContext.Provider value={{list, setList, config}}>
          {children}
        </SelectionContext.Provider>
      )
    }
  ]
}

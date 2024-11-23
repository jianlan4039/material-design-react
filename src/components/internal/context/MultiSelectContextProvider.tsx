import {createContext, ReactNode} from "react";

export interface MultiSelection {
  multiple: boolean
  list?: Array<any>
  setList?: (list: Array<any>, option?: any) => void
}

export const MultiSelectContextProvider = createContext<MultiSelection>({
  multiple: false
})

export const SelectionContextProvider = (props: MultiSelection & { children?: ReactNode }) => {
  const {children, multiple = false, list, setList} = props
  return (
    <MultiSelectContextProvider.Provider value={{multiple: multiple, list: list, setList: setList}}>
      {children}
    </MultiSelectContextProvider.Provider>
  )
}

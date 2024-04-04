import Rect, {createContext, ReactNode} from "react";

export interface MultiSelection {
  multiple: boolean
  list?: Array<any>
  setList?: (list: any, option?: any) => void
}

export const SelectionContext = createContext<MultiSelection>({
  multiple: false
})


export const SelectionContextProvider = (props: MultiSelection & { children?: ReactNode }) => {
  const {children, multiple = false, list, setList} = props
  return <SelectionContext.Provider value={{multiple: multiple, list: list, setList: setList}}>
    {children}
  </SelectionContext.Provider>
}

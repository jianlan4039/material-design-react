import Rect, {createContext, ReactNode} from "react";

export interface MultiSelection {
  multiple: boolean
  options?: Array<any>
  setOption?: (option: any) => void
}

export const SelectionContext = createContext<MultiSelection>({
  multiple: false
})


export const SelectionContextProvider = (props: MultiSelection & { children?: ReactNode }) => {
  const {children, multiple = false, options, setOption} = props
  return <SelectionContext.Provider value={{multiple: multiple, options: options, setOption: setOption}}>
    {children}
  </SelectionContext.Provider>
}

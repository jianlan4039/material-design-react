import {createContext} from "react";

export interface MultiSelection {
  multiple: boolean
  options?: Array<any>
  setOption?: (option: any) => void
}

export const MultiSelectionContext = createContext<MultiSelection>({
  multiple: false
})
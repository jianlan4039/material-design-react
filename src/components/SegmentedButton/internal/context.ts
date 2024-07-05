import {createContext} from "react";
import {MultiSelection} from "../../internal/context/MultiSelectContextProvider";

export const MultiSelectionContext = createContext<MultiSelection>({
  multiple: false
})
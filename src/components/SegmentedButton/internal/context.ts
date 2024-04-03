import {createContext} from "react";
import {MultiSelection} from "../../internal/context/SelectionContext";

export const MultiSelectionContext = createContext<MultiSelection>({
  multiple: false
})
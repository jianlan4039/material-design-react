import {createContext} from "react";
import {MultiSelection} from "../../internal/context/MultiSelectContext";

export const MultiSelectionContext = createContext<MultiSelection>({
  multiple: false
})
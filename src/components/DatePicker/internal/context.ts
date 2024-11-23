import {createSelectionContextProvider} from "../../internal/context/SelectionContext";

export const [SelectionContext, SelectionContextProvider] = createSelectionContextProvider<number>()
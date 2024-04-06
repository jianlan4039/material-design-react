import {createContext, CSSProperties} from "react";

export type CurrentIndicator = { rect: DOMRect, id: string };

export interface IndicatorOperation {
  last?: CurrentIndicator
  current?: CurrentIndicator
  setCurrent?: (current: CurrentIndicator) => void
  init?: (current: CurrentIndicator, force?: boolean) => void
}

export const IndicatorRectContext = createContext<IndicatorOperation>({})

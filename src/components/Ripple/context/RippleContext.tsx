import {createContext} from "react";

export interface RippleEvent {
  target: HTMLElement
}

export interface HoverEvent {
  target: HTMLElement
}

export interface RippleContextProps {
  onRippleStart?: (e: RippleEvent) => void
  onHoverStart?: (e: HoverEvent) => void
}

const RippleContext = createContext<RippleContextProps>({

})

export default RippleContext
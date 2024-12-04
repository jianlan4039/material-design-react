import {CSSProperties, MouseEvent} from "react";

export interface BaseElement<T> {
  className?: string
  style?: CSSProperties
  onClick?: (e: MouseEvent<T>) => void
}
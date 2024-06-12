import React, {ReactNode, useRef} from 'react'
import './FocusRing.scss'
import cln from "classnames";

export interface FocusRingProps {
  children?: ReactNode
  inward?: boolean
}

export default function FocusRing(props: FocusRingProps) {
  const {
    children,
    inward,
  } = props

  const focusRingRef = useRef<HTMLSpanElement>(null);

  const focusHandler = () => {
    if (focusRingRef.current) {
      focusRingRef.current.classList.toggle('visible', true)
    }
  }

  const blurHandler = () => {
    if (focusRingRef.current) {
      focusRingRef.current.classList.toggle('visible', false)
    }
  }

  return (
    <span
      className={'nd-focus-ring-container'}
      tabIndex={0}
      onFocus={focusHandler}
      onBlur={blurHandler}
    >
      <span ref={focusRingRef} className={cln('nd-focus-ring', {'inward': inward})}></span>
    </span>
  )
}
import React, {ReactNode, useEffect, useRef} from 'react'
import './FocusRing.scss'
import cln from "classnames";

export interface FocusRingProps {
  children?: ReactNode
  inward?: boolean
  'for'?: string
}

export default function FocusRing(props: FocusRingProps) {
  const {
    children,
    inward,
    for: id
  } = props

  const focusRingRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

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

  useEffect(() => {
    if (!containerRef.current || !id) return;
    const relevant: HTMLElement | null | undefined = containerRef.current.parentElement?.querySelector(`#${CSS.escape(id)}`)
    if (!relevant) return;
    relevant.addEventListener('focus', focusHandler)
    relevant.addEventListener('blur', blurHandler)

    return () => {
      relevant.removeEventListener('focus', focusHandler)
      relevant.removeEventListener('blur', blurHandler)
    }
  }, [id, containerRef]);

  return (
    <span
      ref={containerRef}
      className={'nd-focus-ring-container'}
      aria-hidden={true}
    >
      <span ref={focusRingRef} className={cln('nd-focus-ring', {'inward': inward})}></span>
    </span>
  )
}
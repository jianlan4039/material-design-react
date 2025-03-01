import React, {HTMLAttributes, useRef, useState} from "react";
import c from "classnames";
import './FocusRing.scss'

export interface FocusRingProps extends HTMLAttributes<HTMLDivElement> {
  inward?: boolean
}

export default function useFocusRing(props?: FocusRingProps) {

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);

  const focusRingStart = () => {
    if (!container.current) return;
    setIsVisible(true);
  };

  const focusRingEnd = () => {
    if (!container.current) return;
    setIsVisible(false);
  };

  const RingContainer = () => (
    <span
      ref={container}
      className={c('nd-focus-ring-container')}
    >
      <span className={c('nd-focus-ring', {'inward': props?.inward, 'visible': isVisible})}></span>
    </span>
  )

  return [
    RingContainer,
    {
      focusRingStart: focusRingStart,
      focusRingEnd: focusRingEnd
    }
  ] as const
}

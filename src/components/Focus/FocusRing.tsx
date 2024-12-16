import React, {useRef, useState} from "react";
import c from "classnames";
import './FocusRing.scss'

export interface FocusRingProps {
  children?: React.ReactNode;
  inward?: boolean
}

export default function FocusRing(props: FocusRingProps) {
  const {children, inward} = props
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const container = useRef<HTMLDivElement>(null);

  const focusHandler = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!container.current) return;
    if (container.current.matches(':focus-visible')) {
      setIsVisible(true);
    }
  };

  const blurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!container.current) return;
    setIsVisible(false);
  };

  return (
    <div
      tabIndex={0}
      ref={container}
      className={c('nd-focus-ring-container')}
      onFocus={focusHandler}
      onBlur={blurHandler}
    >
      <span className={c('nd-focus-ring', {'inward': inward, 'visible': isVisible})}></span>
      {children}
    </div>
  )
}

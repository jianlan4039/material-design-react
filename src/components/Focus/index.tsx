import React, {ComponentType, HTMLAttributes, ReactNode, useRef, useState} from 'react'
import cln from "classnames";
import './FocusRing.scss'

export interface FocusRingProps {
  inward?: boolean
  focusRing?: ReactNode
  children?: ReactNode
}

function withFocusRing<T extends FocusRingProps & HTMLAttributes<HTMLElement>>(WrappedComponent: ComponentType<T>) {
  return ({inward, focusRing, children, ...rest}: T) => {
    const parentRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false)

    const focusHandler = (e: FocusEvent) => {
      if (!parentRef.current) return;
      if (parentRef.current.matches(':focus-visible')) {
        setIsVisible(true)
      }
    }

    const blurHandler = (e: FocusEvent) => {
      if (!parentRef.current) return;
      setIsVisible(false)
    }

    return (
      <WrappedComponent
        ref={parentRef}
        onFocus={focusHandler}
        onPointerDown={blurHandler}
        onBlur={blurHandler}
        focusRing={(
          <span className={'nd-focus-ring-container'} aria-hidden={true}>
            <span className={cln('nd-focus-ring', {'inward': inward, 'visible': isVisible})}></span>
          </span>
        )}
        {...rest as T}
      >
        {children}
      </WrappedComponent>
    )
  }
}

export default withFocusRing
import React, {
  ComponentType,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import cln from "classnames";
import './FocusRing.scss'

export interface FocusRingProps {
  inward?: boolean
  focusRing?: ReactNode
  children?: ReactNode
}

export interface FocusRingHandle{
  parent?: HTMLElement | null
}

function withFocusRing<T extends FocusRingProps & HTMLAttributes<HTMLElement>>(WrappedComponent: ComponentType<T>) {
  return forwardRef<FocusRingHandle, T>(({inward, focusRing, children, ...rest}, ref) => {
    const parentRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      parent: parentRef.current
    }), []);

    const focusHandler = (e: FocusEvent) => {
      if (!parentRef.current) return;
      if (parentRef.current.matches(':focus-visible')) {
        setIsVisible(true);
      }
    };

    const blurHandler = (e: FocusEvent) => {
      if (!parentRef.current) return;
      setIsVisible(false);
    };

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
    );
  });
}

export default withFocusRing
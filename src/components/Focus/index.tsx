import React, {
  ComponentType,
  forwardRef, HTMLAttributes,
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

export interface FocusRingHandle {
  parent?: HTMLElement | null
  ringContainer?: HTMLElement | null
  ring?: HTMLElement | null
}

function withFocusRing<T extends FocusRingProps & HTMLAttributes<HTMLElement>>(WrappedComponent: ComponentType<T>) {
  return forwardRef<FocusRingHandle, T>(({inward, children, ...rest}, ref) => {
    const parent = useRef<HTMLElement>(null);
    const container = useRef<HTMLElement>(null);
    const ring = useRef<HTMLElement>(null)
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      parent: parent.current,
      ringContainer: container.current,
      ring: ring.current
    }));

    const focusHandler = (e: FocusEvent) => {
      if (!parent.current) return;
      if (parent.current.matches(':focus-visible')) {
        setIsVisible(true);
      }
    };

    const blurHandler = (e: FocusEvent) => {
      if (!parent.current) return;
      setIsVisible(false);
    };

    return (
      <WrappedComponent
        ref={parent}
        onFocus={focusHandler}
        onPointerDown={blurHandler}
        onBlur={blurHandler}
        focusRing={(
          <span ref={container} className={'nd-focus-ring-container'} aria-hidden={true}>
            <span ref={ring} className={cln('nd-focus-ring', {'inward': inward, 'visible': isVisible})}></span>
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
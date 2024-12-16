import React, {useState} from "react";
import classNames from "classnames";
import './FocusRing.scss';

export interface FocusRingProps<R extends HTMLElement> {
  parent?: R | null,
  inward?: boolean
  onFocus?: (e: React.FocusEvent<R>) => void;
  onBlur?: (e: React.FocusEvent<R>) => void;
}

function useFocusRing<R extends HTMLElement>({parent, inward = false, onFocus, onBlur}: FocusRingProps<R>) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const focusHandler = (e: React.FocusEvent<R>) => {
    if (!parent) return;
    onFocus?.(e)
    if (parent.matches(':focus-visible')) {
      setIsVisible(true);
    }
  };

  const blurHandler = (e: React.FocusEvent<R>) => {
    if (!parent) return;
    onBlur?.(e)
    setIsVisible(false);
  };

  const focusRing = (
    <span className={'nd-focus-ring-container'}>
      <span className={classNames('nd-focus-ring', {'inward': inward, 'visible': isVisible})}></span>
    </span>
  );

  return [
    {onFocus: focusHandler, onBlur: blurHandler},
    focusRing
  ] as const;
}

export default useFocusRing;
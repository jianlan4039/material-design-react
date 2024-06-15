import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  MouseEvent,
  useRef,
  useState,
  useEffect,
  useImperativeHandle
} from 'react'
import cln from "classnames";
import {linkHandler} from "../../internal/common/handlers";
import useFocusRing from "../../Focus/useFocusRing";
import useRipple from "../../Ripple/useRipple";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  icon?: ReactNode
  disabled?: boolean
  elevated?: boolean
  href?: string
  target?: string
  alwaysFocusable?: boolean
  label?: string
}

export interface ButtonHandle {
  button?: HTMLButtonElement | null
}

const Button = forwardRef<ButtonHandle, ButtonProps>((props, ref) => {
  const {
    children,
    icon,
    disabled,
    alwaysFocusable,
    href = "",
    target = "",
    label,
    onClick,
    onFocus,
    onBlur,
    onMouseOver,
    onMouseOut,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    ...rest
  } = props

  const btnRef = useRef<HTMLButtonElement>(null);
  const [parent, setParent] = useState<HTMLButtonElement>()

  const [focusRingProps, focusRing] = useFocusRing<HTMLButtonElement>({parent, onFocus, onBlur})
  const [rippleProps, ripple] = useRipple<HTMLButtonElement>({
    onMouseOver,
    onMouseOut,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd
  })

  useEffect(() => {
    if (btnRef.current) {
      setParent(btnRef.current)
    }
  }, [btnRef]);

  useImperativeHandle(ref, () => ({
    button: btnRef.current
  }))

  function clickHandler(e: MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    onClick?.(e)
    if (href) {
      e.preventDefault()
      linkHandler(href, target)
    }
  }

  return (
    <button
      ref={btnRef}
      className={cln('nd-chip__button', {
        'nd-chip--with-icon': icon,
      })}
      aria-disabled={disabled}
      onClick={clickHandler}
      {...focusRingProps}
      {...rippleProps}
      {...rest}
    >
      {icon && <span className={'nd-chip__icon-slot'}>{icon}</span>}
      {!disabled && ripple}
      {focusRing}
      <span className={'nd-chip__label'}>{children || label}</span>
    </button>
  )
})

export default Button
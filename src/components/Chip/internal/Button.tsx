import React, {forwardRef, HTMLAttributes, ReactNode, MouseEvent} from 'react'
import StateLayer from "../../StateLayer";
import cln from "classnames";
import {StateElement} from "../../internal/common/StateElement";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, StateElement {
  children?: ReactNode
  icon?: ReactNode
  disabled?: boolean
  elevated?: boolean
  href?: string
  target?: string
  alwaysFocusable?: boolean
  label?: string
}

const Button = StateLayer<HTMLButtonElement, ButtonProps>(forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    icon,
    disabled,
    stateLayer,
    alwaysFocusable,
    href = "",
    target = "",
    label,
    onClick,
    ...rest
  } = props

  function navigateTo(url: string, target: string) {
    if (target === '_blank') {
      window.open(url, '_blank');
    } else if (target === '_self') {
      window.location.href = url;
    } else if (target === '_parent') {
      window.parent.location.href = url;
    } else if (target === '_top' && window.top) {
      window.top.location.href = url;
    } else {
      // Default behavior if target is not recognized
      window.location.href = url;
    }
  }


  function clickHandler(e: MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    onClick?.(e)
    if (href) {
      e.preventDefault()
      navigateTo(href, target)
    }
  }

  return (
    <button
      ref={ref}
      className={cln('nd-chip__button', {
        'nd-chip--with-icon': icon,
      })}
      onClick={clickHandler}
      {...rest}
    >
      {icon && <span className={'nd-chip__icon-slot'}>{icon}</span>}
      {!disabled && stateLayer}
      <span className={'nd-chip__label'}>{children || label}</span>
    </button>
  )
}))

export default Button
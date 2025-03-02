import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  MouseEvent,
  useRef,
  useImperativeHandle
} from 'react'
import cln from "classnames";
import {linkHandler} from "../../internal/common/handlers";
import StatefulBox from "../../StatefulBox/StatefulBox";

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
    ...rest
  } = props

  const btnRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => ({
    button: btnRef.current
  }))

  function clickHandler(e: MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    onClick?.(e)
    href && linkHandler(href, target)
  }

  return (
    <StatefulBox
      variant={'button'}
      ref={btnRef}
      className={cln('nd-chip__button', {
        'with-icon': icon,
      })}
      aria-disabled={disabled}
      onClick={clickHandler}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className={'nd-chip__icon-slot'}>{icon}</span>}
      <span className={'nd-chip__label'}>{children || label}</span>
    </StatefulBox>
  )
})

export default Button
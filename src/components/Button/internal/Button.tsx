import React, {forwardRef, ReactNode, MouseEvent} from 'react'
import cln from "classnames";
import {linkHandler} from "../../internal/common/handlers";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  label?: string | ReactNode
  icon?: ReactNode
  trailingIcon?: boolean // Determine where the icon rendered, if true, icon rendered at the end of inline, otherwise at the start of inline.
  hasIcon?: boolean // Whether to display the icon or not.
  href?: string
  target?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    label,
    icon,
    trailingIcon,
    hasIcon = true,
    href = '',
    target = '',
    onClick,
    disabled,
    ...rest
  } = props

  const renderIcon = Boolean(hasIcon && icon)

  function btnClickHandler(e: MouseEvent<HTMLButtonElement>) {
    if (disabled) return;
    onClick?.(e)
    if (href) {
      e.preventDefault();
      linkHandler(href, target)
    }
  }

  return (
    <button
      ref={ref}
      className={cln('nd-button', {
        'nd-button--has-icon': renderIcon && !trailingIcon,
        'nd-button--has-trailing-icon': renderIcon && trailingIcon
      })}
      onClick={btnClickHandler}
      {...rest}
    >
      {renderIcon && !trailingIcon && <span className={'nd-button__icon-slot'}>{icon}</span>}
      {label}
      {renderIcon && trailingIcon && <span className={'nd-button__icon-slot'}>{icon}</span>}
    </button>
  )
})

export default Button
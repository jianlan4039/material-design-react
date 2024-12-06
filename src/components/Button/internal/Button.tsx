import React, {forwardRef, ReactNode} from 'react';
import cln from "classnames";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  icon?: ReactNode
  /** move the icon to the trail. */
  trailingIcon?: boolean
  /** show icon or not. */
  showIcon?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    label,
    icon,
    trailingIcon,
    showIcon = true,
    disabled,
    children,
    ...rest
  } = props

  const renderIcon = Boolean(showIcon && icon && !trailingIcon)
  const renderTrailingIcon = Boolean(showIcon && icon && trailingIcon)

  return (
    <button
      ref={ref}
      className={cln('nd-button', {
        'nd-button--icon': renderIcon,
        'nd-button--trailing-icon': renderTrailingIcon
      })}
      {...rest}
    >
      {renderIcon && <span className={'nd-button__icon-slot'}>{icon}</span>}
      {label || children}
      {renderTrailingIcon && <span className={'nd-button__icon-slot'}>{icon}</span>}
    </button>
  )
})

export default Button
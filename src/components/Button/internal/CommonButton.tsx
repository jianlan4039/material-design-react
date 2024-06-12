import React, {forwardRef, ReactNode} from 'react'
import cln from "classnames";

export interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  children?: ReactNode
  icon?: ReactNode
  trailingIcon?: boolean // Determine where the icon rendered, if true, icon rendered at the end of inline, otherwise at the start of inline.
  hasIcon?: boolean // Whether to display the icon or not.
  href?: string
  target?: string
}

const CommonButton = forwardRef<HTMLButtonElement, CommonButtonProps>((props, ref) => {
  const {
    children,
    icon,
    trailingIcon,
    hasIcon = true,
    href,
    target,
    ...rest
  } = props

  const renderIcon = Boolean(hasIcon && icon)

  return (
    <button
      tabIndex={-1}
      ref={ref}
      className={cln('nd-button', {
        'nd-button--has-icon': renderIcon && !trailingIcon,
        'nd-button--has-trailing-icon': renderIcon && trailingIcon
      })}
      {...rest}
    >
      {renderIcon && !trailingIcon && <span className={'nd-button__icon-slot'}>{icon}</span>}
      {children}
      {renderIcon && trailingIcon && <span className={'nd-button__icon-slot'}>{icon}</span>}
      {href && <a href={href} target={target} className={'nd-button__a'}></a>}
    </button>
  )
})

export default CommonButton
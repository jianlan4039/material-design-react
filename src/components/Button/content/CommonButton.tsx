import React, {forwardRef, ReactNode} from 'react'
import cln from "classnames";

export interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  children?: ReactNode
  icon?: ReactNode
  trailingIcon?: ReactNode
}

const CommonButton = forwardRef<HTMLButtonElement, CommonButtonProps>((props, ref) => {
  const {
    children,
    icon,
    trailingIcon,
    ...rest
  } = props

  return (
    <button
      ref={ref}
      className={cln('nd-button', {
        'nd-button--has-icon': icon,
        'nd-button--has-trailing-icon': trailingIcon
      })}
      {...rest}
    >
      {icon && <span className={'nd-button__icon-slot'}>{icon}</span>}
      {children}
      {trailingIcon && <span className={'nd-button__trailing-icon-slot'}>{trailingIcon}</span>}
    </button>
  )
})

export default CommonButton
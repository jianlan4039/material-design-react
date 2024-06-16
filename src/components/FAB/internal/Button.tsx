import React, {ButtonHTMLAttributes, forwardRef, ReactNode, MouseEvent} from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  label?: string
  icon?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    label,
    icon,
    disabled,
    onClick,
    ...rest
  } = props

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(e)
  }

  return (
    <button
      ref={ref}
      aria-disabled={disabled}
      className={'nd-fab__button'}
      onClick={clickHandler}
      {...rest}
    >
      <span className={'nd-fab__icon-slot'}>{icon || children}</span>
      <span className={'nd-fab__label-slot'}>{label}</span>
    </button>
  )
})

export default Button
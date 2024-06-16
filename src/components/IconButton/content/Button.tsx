import React, {ReactNode, ButtonHTMLAttributes, forwardRef} from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    ...rest
  } = props

  return (
    <button ref={ref} className={'nd-icon-button__button'} aria-disabled={disabled} {...rest}>
      <span className={'nd-icon-button__icon-slot'}>{children}</span>
    </button>
  )
})

export default Button
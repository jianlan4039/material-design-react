import React, {forwardRef, HTMLAttributes, ReactNode} from 'react'
import cln from "classnames";

export interface SegmentedButtonContentProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  icon?: ReactNode
  trailingIcon?: ReactNode
  disabled?: boolean
}

const SegmentedButtonContent = forwardRef<HTMLButtonElement, SegmentedButtonContentProps>((props, ref) => {
  const {
    children,
    icon,
    trailingIcon,
    disabled,
    ...rest
  } = props

  return (
    <button
      ref={ref}
      className={cln('nd-segmented-button-content', {
        'nd-disabled': disabled
      })}
      disabled={disabled}
      {...rest}
    >
      <span className={'nd-segmented-button__icon-slot'}>{icon}</span>
      <span className={'nd-segmented-button__label'}>{children}</span>
      <span className={'nd-segmented-button__trailing-icon-slot'}>{trailingIcon}</span>
    </button>
  )
})

export default SegmentedButtonContent
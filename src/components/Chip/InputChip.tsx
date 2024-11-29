import React, {forwardRef, ReactNode, MouseEvent, useRef, useImperativeHandle} from 'react'
import Button, {ButtonHandle, ButtonProps} from "./internal/Button";
import './InputChip.scss'
import Outline from "../Outline/Outline";
import cln from "classnames";
import useRipple from "../Ripple/useRipple";

export interface InputChipProps extends Omit<ButtonProps, 'elevated'> {
  children?: ReactNode
  onClose?: (e: MouseEvent<HTMLButtonElement>) => void
}

export interface InputChipHandle extends ButtonHandle {
  trailingButton?: HTMLButtonElement | null
}

const InputChip = forwardRef<InputChipHandle, InputChipProps>((props, ref) => {
  const {
    children,
    disabled,
    onClick,
    onClose,
    ...rest
  } = props

  const btnRef = useRef<ButtonHandle>(null);
  const trailingBtnRef = useRef<HTMLButtonElement>(null);

  const [rippleProps, ripple] = useRipple<HTMLButtonElement>({})

  useImperativeHandle(ref, () => ({
    button: btnRef.current?.button,
    trailingButton: trailingBtnRef.current
  }))

  return (
    <div
      className={cln('nd-input-chip', {
        'nd-disabled': disabled,
      })}
    >
      <Outline></Outline>
      <Button ref={btnRef} disabled={disabled} onClick={onClick} {...rest}>
        {children}
      </Button>
      <button
        ref={trailingBtnRef}
        className={'nd-input-chip__trail'}
        onClick={onClose}
        disabled={disabled}
        {...rippleProps}
      >
        {!disabled && ripple}
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path
              d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
          </svg>
      </button>
    </div>
  )
})

export default InputChip
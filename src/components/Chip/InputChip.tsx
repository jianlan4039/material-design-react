import React, {forwardRef, ReactNode, MouseEvent} from 'react'
import Button, {ButtonProps} from "./internal/Button";
import './InputChip.scss'
import Outline from "../Outline/Outline";
import withStateLayer from "../StateLayer";
import cln from "classnames";
import {StateElement} from "../internal/common/StateElement";
import FocusRing from "../Focus/FocusRing";

export interface InputChipProps extends Omit<ButtonProps, 'elevated'>, StateElement {
  children?: ReactNode
  onClose?: (e: MouseEvent<HTMLButtonElement>) => void
}

const InputChip = withStateLayer<HTMLButtonElement, InputChipProps>(forwardRef<HTMLDivElement, InputChipProps>((props, ref) => {
  const {
    children ,
    disabled,
    stateLayer,
    onClick,
    onClose,
    ...rest
  } = props

  return (
    <div
      ref={ref}
      className={cln('nd-input-chip', {
        'nd-disabled': disabled,
      })}
    >
      <Outline></Outline>
      {!disabled && <FocusRing></FocusRing>}
      <Button disabled={disabled} onClick={onClick}>
        {children}
      </Button>
      <button
        className={'nd-input-chip__trail'}
        onClick={onClose}
        {...rest}
      >
        {!disabled && stateLayer}
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path
            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
      </button>
    </div>
  )
}))

export default InputChip
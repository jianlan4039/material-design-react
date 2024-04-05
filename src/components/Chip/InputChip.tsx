import React, {forwardRef, ReactNode, MouseEvent} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './InputChip.scss'
import Outline from "../Outline/Outline";
import StateLayer from "../StateLayer";
import Elevation from "../Elevation";
import cln from "classnames";
import {StateElement} from "../internal/common/StateElement";

export interface InputChipProps extends Omit<ButtonProps, 'elevated'>, StateElement {
  children?: ReactNode
}

const InputChip = StateLayer<HTMLDivElement, InputChipProps>(forwardRef<HTMLDivElement, InputChipProps>((props, ref) => {
  const {
    children,
    disabled,
    stateLayer,
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
      <Button disabled={disabled}>
        {children}
      </Button>
      <button
        className={'nd-input-chip__trail'}
        {...rest}
      >
        {stateLayer}
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path
            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
      </button>
    </div>
  )
}))

export default InputChip
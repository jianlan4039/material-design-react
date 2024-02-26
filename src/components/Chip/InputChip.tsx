import React, {forwardRef, ReactNode, MouseEvent} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './InputChip.scss'
import Outline from "../Outline/Outline";
import StateLayer from "../StateLayer";
import Elevation from "../Elevation";
import cln from "classnames";

export interface InputChipProps extends Omit<ButtonProps, 'elevated'> {
  children?: ReactNode
}

const InputChip = forwardRef((props: InputChipProps, ref) => {
  const {
    children,
    disabled,
    ...rest
  } = props

  return (
    <div className={cln('nd-input-chip', {
      'nd-disabled': disabled,
    })}>
      <Outline></Outline>
      <Button disabled={disabled} {...rest}>
        {children}
      </Button>
      <button
        className={'nd-input-chip__trail'}
      >
        <StateLayer disabled={disabled}></StateLayer>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path
            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
      </button>
    </div>
  )
})

export default InputChip
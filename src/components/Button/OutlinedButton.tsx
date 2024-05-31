import React, {forwardRef, ReactNode} from 'react'
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import CommonButton, {CommonButtonProps} from "./internal/CommonButton";
import cln from "classnames";
import './OutlinedButton.scss'
import Outline from "../Outline/Outline";
import {StateElement} from "../internal/common/StateElement";

export interface OutlinedButtonProps extends CommonButtonProps, StateElement {
  children?: ReactNode
}

const OutlinedButton = StateLayer<HTMLButtonElement, OutlinedButtonProps>(forwardRef<HTMLButtonElement, OutlinedButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    stateLayer,
    className,
    ...rest
  } = props

  return (
    <div className={cln('nd-outlined-button', className, {'nd-disabled': disabled})}>
      <Outline disabled={disabled}></Outline>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      {stateLayer}
      <CommonButton ref={ref} disabled={disabled} {...rest}>
        {children}
      </CommonButton>
    </div>
  )
}))

export default OutlinedButton
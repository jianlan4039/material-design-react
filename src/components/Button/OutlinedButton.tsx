import React, {forwardRef, ReactNode} from 'react'
import Elevation from "../Elevation";
import withStateLayer from "../StateLayer";
import CommonButton, {CommonButtonProps} from "./internal/CommonButton";
import cln from "classnames";
import './OutlinedButton.scss'
import Outline from "../Outline/Outline";
import {StateElement} from "../internal/common/StateElement";
import withFocusRing, {FocusRingProps} from "../Focus";

export interface OutlinedButtonProps extends CommonButtonProps, StateElement, FocusRingProps {
  children?: ReactNode
}

const OutlinedButton = withFocusRing(withStateLayer<HTMLButtonElement, OutlinedButtonProps>(forwardRef<HTMLButtonElement, OutlinedButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    stateLayer,
    className,
    focusRing,
    ...rest
  } = props

  return (
    <div className={cln('nd-outlined-button', className, {'nd-disabled': disabled})}>
      <Outline disabled={disabled}></Outline>
      <Elevation></Elevation>
      {stateLayer}
      {focusRing}
      <CommonButton ref={ref} disabled={disabled} {...rest}>
        {children}
      </CommonButton>
    </div>
  )
})))

export default OutlinedButton
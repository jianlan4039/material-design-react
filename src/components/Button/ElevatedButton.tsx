import React, {forwardRef, ReactNode} from 'react'
import './ElevatedButton.scss'
import cln from "classnames";
import withStateLayer from "../StateLayer";
import Elevation from "../Elevation";
import CommonButton, {CommonButtonProps} from "./internal/CommonButton";
import {StateElement} from "../internal/common/StateElement";
import withFocusRing, {FocusRingProps} from "../Focus";

export interface ElevatedButtonProps extends CommonButtonProps, StateElement, FocusRingProps {
  children?: ReactNode
}

const ElevatedButton = withFocusRing(withStateLayer(forwardRef<HTMLButtonElement, ElevatedButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    stateLayer,
    className,
    focusRing,
    ...rest
  } = props

  return (
    <div className={cln('nd-elevated-button', className, {'nd-disabled': disabled})}>
      <Elevation></Elevation>
      {stateLayer}
      {focusRing}
      <CommonButton ref={ref} disabled={disabled} {...rest}>
        {children}
      </CommonButton>
    </div>
  )
})))

export default ElevatedButton
import React, {forwardRef, ReactNode} from 'react'
import './ElevatedButton.scss'
import cln from "classnames";
import StateLayer from "../StateLayer";
import Elevation from "../Elevation";
import FocusRing from "../Focus/FocusRing";
import CommonButton, {CommonButtonProps} from "./internal/CommonButton";
import {StateElement} from "../internal/common/StateElement";

export interface ElevatedButtonProps extends CommonButtonProps, StateElement {
  children?: ReactNode
}

const ElevatedButton: React.FC<ElevatedButtonProps> = StateLayer<HTMLDivElement, ElevatedButtonProps>(forwardRef<HTMLButtonElement, ElevatedButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    stateLayer,
    className,
    ...rest
  } = props

  return (
    <div className={cln('nd-elevated-button', className, {'nd-disabled': disabled})}>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      {stateLayer}
      <CommonButton ref={ref} disabled={disabled} {...rest}>
        {children}
      </CommonButton>
    </div>
  )
}))

export default ElevatedButton
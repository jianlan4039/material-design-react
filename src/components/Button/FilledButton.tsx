import React, {forwardRef, ReactNode} from 'react'
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import CommonButton, {CommonButtonProps} from "./content/CommonButton";
import cln from "classnames";
import './FilledButton.scss'
import {StateElement} from "../internal/common/StateElement";

export interface FilledButtonProps extends CommonButtonProps, StateElement {
  children?: ReactNode
}

const FilledButton = StateLayer<HTMLButtonElement, FilledButtonProps>(forwardRef<HTMLButtonElement, FilledButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    stateLayer,
    ...rest
  } = props

  return (
    <div className={cln('nd-filled-button', {'nd-disabled': disabled})}>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      {stateLayer}
      <CommonButton ref={ref} disabled={disabled} {...rest}>
        {children}
      </CommonButton>
    </div>
  )
}))

export default FilledButton
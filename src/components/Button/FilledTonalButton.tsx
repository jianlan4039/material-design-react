import React, {forwardRef, ReactNode} from 'react'
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import withStateLayer from "../StateLayer";
import CommonButton, {CommonButtonProps} from "./internal/CommonButton";
import cln from "classnames";
import './FilledTonalButton.scss'
import {StateElement} from "../internal/common/StateElement";
import withFocusRing, {FocusRingProps} from "../Focus";

export interface FilledTonalButtonProps extends CommonButtonProps, StateElement, FocusRingProps {
  children?: ReactNode
}

const FilledTonalButton = withFocusRing(withStateLayer<HTMLButtonElement, FilledTonalButtonProps>(forwardRef<HTMLButtonElement, FilledTonalButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    stateLayer,
    className,
    focusRing,
    ...rest
  } = props

  return (
    <div className={cln('nd-filled-tonal-button', className, {'nd-disabled': disabled})}>
      <Elevation></Elevation>
      {stateLayer}
      {focusRing}
      <CommonButton ref={ref} disabled={disabled} {...rest}>
        {children}
      </CommonButton>
    </div>
  )
})))

export default FilledTonalButton
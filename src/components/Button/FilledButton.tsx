import React, {forwardRef, ReactNode} from 'react'
import Elevation from "../Elevation";
import withStateLayer from "../StateLayer";
import CommonButton, {CommonButtonProps} from "./internal/CommonButton";
import cln from "classnames";
import './FilledButton.scss'
import {StateElement} from "../internal/common/StateElement";
import withFocusRing, {FocusRingProps} from "../Focus";

export interface FilledButtonProps extends CommonButtonProps, StateElement, FocusRingProps {
  children?: ReactNode
}

const FilledButton = withFocusRing<FilledButtonProps>(withStateLayer<HTMLButtonElement, FilledButtonProps>(forwardRef<HTMLButtonElement, FilledButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    stateLayer,
    className,
    focusRing,
    ...rest
  } = props

  return (
    <div className={cln('nd-filled-button', className,  {'nd-disabled': disabled})}>
      <Elevation></Elevation>
      {stateLayer}
      {focusRing}
      <CommonButton ref={ref} disabled={disabled} {...rest}>
        {children}
      </CommonButton>
    </div>
  )
})))

export default FilledButton
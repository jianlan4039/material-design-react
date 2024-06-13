import React, {forwardRef, ReactNode} from 'react'
import FocusRing from "../Focus/FocusRing";
import withStateLayer from "../StateLayer";
import CommonButton, {CommonButtonProps} from "./internal/CommonButton";
import cln from "classnames";
import './TextButton.scss'
import {StateElement} from "../internal/common/StateElement";
import withFocusRing, {FocusRingProps} from "../Focus";

export interface TextButtonProps extends CommonButtonProps, StateElement, FocusRingProps {
  children?: ReactNode
}

const TextButton = withFocusRing(withStateLayer<HTMLButtonElement, TextButtonProps>(forwardRef<HTMLButtonElement, TextButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    stateLayer,
    className,
    focusRing,
    ...rest
  } = props

  return (
    <div className={cln('nd-text-button', className, {'nd-disabled': disabled})}>
      <FocusRing></FocusRing>
      {stateLayer}
      {focusRing}
      <CommonButton ref={ref} disabled={disabled} {...rest}>
        {children}
      </CommonButton>
    </div>
  )
})));

export default TextButton

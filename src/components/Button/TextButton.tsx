import React, {forwardRef, ReactNode} from 'react'
import FocusRing from "../Focus/FocusRing";
import StateLayer from "../StateLayer";
import CommonButton, {CommonButtonProps} from "./internal/CommonButton";
import cln from "classnames";
import './TextButton.scss'
import {StateElement} from "../internal/common/StateElement";

export interface TextButtonProps extends CommonButtonProps, StateElement {
  children?: ReactNode
}

const TextButton = StateLayer<HTMLButtonElement, TextButtonProps>(forwardRef<HTMLButtonElement, TextButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    stateLayer,
    className,
    ...rest
  } = props

  return (
    <div className={cln('nd-text-button', className, {'nd-disabled': disabled})}>
      <FocusRing></FocusRing>
      {stateLayer}
      <CommonButton ref={ref} disabled={disabled} {...rest}>
        {children}
      </CommonButton>
    </div>
  )
}));

export default TextButton

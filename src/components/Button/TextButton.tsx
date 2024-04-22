import React, {forwardRef, ReactNode} from 'react'
import FocusRing from "../Focus/FocusRing";
import StateLayer from "../StateLayer";
import CommonButton, {CommonButtonProps} from "./content/CommonButton";
import cln from "classnames";
import './TextButton.scss'

export interface TextButtonProps extends CommonButtonProps {
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

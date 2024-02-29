import React, {forwardRef, ReactNode} from 'react'
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import CommonButton, {CommonButtonProps} from "./content/CommonButton";
import cln from "classnames";
import './TextButton.scss'

export interface TextButtonProps extends CommonButtonProps {
  children?: ReactNode
}

const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    ...rest
  } = props

  return (
    <div className={cln('nd-text-button', {'nd-disabled': disabled})}>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      <StateLayer disabled={disabled}></StateLayer>
      <CommonButton disabled={disabled} {...rest}>
        {children}
      </CommonButton>
    </div>
  )
})

export default TextButton

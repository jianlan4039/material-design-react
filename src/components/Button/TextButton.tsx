import React, {ReactNode} from 'react'
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import CommonButton, {CommonButtonProps} from "./content/CommonButton";
import cln from "classnames";
import './TextButton.scss'

export interface TextButtonProps extends CommonButtonProps {
  children?: ReactNode
}

export default function TextButton(props: TextButtonProps) {
  const {
    children,
    disabled,
    ...rest
  } = props

  return (
    <div className={cln('nd-text-button', {'disabled': disabled})}>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      <StateLayer disabled={disabled}></StateLayer>
      <CommonButton {...rest}>
        {children}
      </CommonButton>
    </div>
  )
}
import React, {ReactNode} from 'react'
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import CommonButton, {CommonButtonProps} from "./content/CommonButton";
import cln from "classnames";
import './OutlinedButton.scss'

export interface OutlinedButtonProps extends CommonButtonProps {
  children?: ReactNode
}

export default function OutlinedButton(props: OutlinedButtonProps) {
  const {
    children,
    disabled,
    ...rest
  } = props

  return (
    <div className={cln('nd-outlined-button', {'disabled': disabled})}>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      <StateLayer disabled={disabled}></StateLayer>
      <CommonButton {...rest}>
        {children}
      </CommonButton>
    </div>
  )
}
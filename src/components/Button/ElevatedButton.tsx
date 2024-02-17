import React, {ReactNode} from 'react'
import './ElevatedButton.scss'
import cln from "classnames";
import StateLayer from "../StateLayer";
import Elevation from "../Elevation";
import FocusRing from "../Focus/FocusRing";
import CommonButton, {CommonButtonProps} from "./content/CommonButton";

export interface ElevatedButtonProps extends CommonButtonProps {
  children?: ReactNode
}

export default function ElevatedButton(props: ElevatedButtonProps) {
  const {
    children,
    disabled,
    ...rest
  } = props

  return (
    <div className={cln('nd-elevated-button', {'disabled': disabled})}>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      <StateLayer disabled={disabled}></StateLayer>
      <CommonButton {...rest}>
        {children}
      </CommonButton>
    </div>
  )
}
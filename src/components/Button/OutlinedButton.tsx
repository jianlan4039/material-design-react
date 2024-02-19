import React, {ReactNode} from 'react'
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import CommonButton, {CommonButtonProps} from "./content/CommonButton";
import cln from "classnames";
import './OutlinedButton.scss'
import Outline from "../Outline/Outline";

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
    <div className={cln('nd-outlined-button', {'nd-disabled': disabled})}>
      <Outline disabled={disabled}></Outline>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      <StateLayer disabled={disabled}></StateLayer>
      <CommonButton disabled={disabled} {...rest}>
        {children}
      </CommonButton>
    </div>
  )
}
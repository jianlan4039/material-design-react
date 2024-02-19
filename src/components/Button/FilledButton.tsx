import React, {ReactNode} from 'react'
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import CommonButton, {CommonButtonProps} from "./content/CommonButton";
import cln from "classnames";
import './FilledButton.scss'

export interface FilledButtonProps extends CommonButtonProps {
  children?: ReactNode
}

export default function FilledButton(props: FilledButtonProps) {
  const {
    children,
    disabled,
    ...rest
  } = props

  return (
    <div className={cln('nd-filled-button', {'nd-disabled': disabled})}>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      <StateLayer disabled={disabled}></StateLayer>
      <CommonButton disabled={disabled} {...rest}>
        {children}
      </CommonButton>
    </div>
  )
}
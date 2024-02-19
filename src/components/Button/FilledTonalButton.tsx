import React, {ReactNode} from 'react'
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import CommonButton, {CommonButtonProps} from "./content/CommonButton";
import cln from "classnames";
import './FilledTonalButton.scss'

export interface FilledTonalButtonProps extends CommonButtonProps {
  children?: ReactNode
}

export default function FilledTonalButton(props: FilledTonalButtonProps) {
  const {
    children,
    disabled,
    ...rest
  } = props

  return (
    <div className={cln('nd-filled-tonal-button', {'nd-disabled': disabled})}>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      <StateLayer disabled={disabled}></StateLayer>
      <CommonButton {...rest}>
        {children}
      </CommonButton>
    </div>
  )
}
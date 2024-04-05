import React, {forwardRef, ReactNode} from 'react'
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

const OutlinedButton = StateLayer<HTMLDivElement, OutlinedButtonProps>(forwardRef<HTMLDivElement, OutlinedButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    stateLayer,
    ...rest
  } = props

  return (
    <div ref={ref} className={cln('nd-outlined-button', {'nd-disabled': disabled})}>
      <Outline disabled={disabled}></Outline>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      {stateLayer}
      <CommonButton disabled={disabled} {...rest}>
        {children}
      </CommonButton>
    </div>
  )
}))

export default OutlinedButton
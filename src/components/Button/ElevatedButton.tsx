import React, {forwardRef, ReactNode} from 'react'
import './ElevatedButton.scss'
import cln from "classnames";
import StateLayer from "../StateLayer";
import Elevation from "../Elevation";
import FocusRing from "../Focus/FocusRing";
import CommonButton, {CommonButtonProps} from "./content/CommonButton";

export interface ElevatedButtonProps extends CommonButtonProps {
  children?: ReactNode
}

const ElevatedButton = StateLayer<HTMLButtonElement, ElevatedButtonProps>(forwardRef<HTMLButtonElement, ElevatedButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    stateLayer,
    ...rest
  } = props

  return (
    <div className={cln('nd-elevated-button', {'nd-disabled': disabled})}>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      {stateLayer}
      <CommonButton ref={ref} disabled={disabled} {...rest}>
        {children}
      </CommonButton>
    </div>
  )
}))

export default ElevatedButton
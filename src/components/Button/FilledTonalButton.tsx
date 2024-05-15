import React, {forwardRef, ReactNode} from 'react'
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import CommonButton, {CommonButtonProps} from "./content/CommonButton";
import cln from "classnames";
import './FilledTonalButton.scss'

export interface FilledTonalButtonProps extends CommonButtonProps {
  children?: ReactNode
}

const FilledTonalButton = StateLayer<HTMLButtonElement, FilledTonalButtonProps>(forwardRef<HTMLButtonElement, FilledTonalButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    stateLayer,
    ...rest
  } = props

  return (
    <div className={cln('nd-filled-tonal-button', {'nd-disabled': disabled})}>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      {stateLayer}
      <CommonButton ref={ref} {...rest}>
        {children}
      </CommonButton>
    </div>
  )
}))

export default FilledTonalButton
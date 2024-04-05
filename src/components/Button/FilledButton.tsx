import React, {forwardRef, ReactNode} from 'react'
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import CommonButton, {CommonButtonProps} from "./content/CommonButton";
import cln from "classnames";
import './FilledButton.scss'

export interface FilledButtonProps extends CommonButtonProps {
  children?: ReactNode
}

const FilledButton = StateLayer<HTMLDivElement, FilledButtonProps>(forwardRef<HTMLDivElement, FilledButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    stateLayer,
    ...rest
  } = props

  return (
    <div ref={ref} className={cln('nd-filled-button', {'nd-disabled': disabled})}>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      {stateLayer}
      <CommonButton disabled={disabled} {...rest}>
        {children}
      </CommonButton>
    </div>
  )
}))

export default FilledButton
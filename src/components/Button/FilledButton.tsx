import React, {ReactNode} from 'react'
import FocusRing from "../Focus/FocusRing";
import Elevation from "../Elevation";
import StateLayer from "../StateLayer";
import CommonButton, {CommonButtonProps} from "./content/CommonButton";
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
    <div className={'nd-filled-button'}>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      <StateLayer disabled={disabled}></StateLayer>
      <CommonButton {...rest}>
        {children}
      </CommonButton>
    </div>
  )
}
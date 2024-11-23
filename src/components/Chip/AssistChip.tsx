import React, {forwardRef} from 'react'
import Button, {ButtonHandle, ButtonProps} from "./internal/Button";
import Outline from "../Outline/Outline";
import cln from "classnames";
import Elevation from "../Elevation";
import './AssistChip.scss'

export interface AssistChipProps extends ButtonProps {

}

export interface AssistChipHandle extends ButtonHandle {

}

const AssistChip = forwardRef<AssistChipHandle, AssistChipProps>((props, ref) => {
  const {
    children,
    disabled,
    elevated,
    ...rest
  } = props

  return (
    <div
      className={cln('nd-assist-chip', {
        'nd-disabled': disabled,
        'nd-elevated': elevated
      })}
    >
      {elevated ? <Elevation></Elevation> : <Outline></Outline>}
      <Button ref={ref} disabled={disabled} {...rest}>
        {children}
      </Button>
    </div>
  )
})

export default AssistChip
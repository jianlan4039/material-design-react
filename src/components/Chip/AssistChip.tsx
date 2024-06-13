import React, {forwardRef, ReactNode} from 'react'
import Button, {ButtonProps} from "./internal/Button";
import Outline from "../Outline/Outline";
import './AssistChip.scss'
import cln from "classnames";
import Elevation from "../Elevation";

export interface AssistChipProps extends ButtonProps {
  children?: ReactNode
}

const AssistChip = forwardRef<HTMLButtonElement, AssistChipProps>((props, ref) => {
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
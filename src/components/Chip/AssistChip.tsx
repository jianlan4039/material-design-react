import React, {ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import Outline from "../Outline/Outline";
import './AssistChip.scss'
import FocusRing from "../Focus/FocusRing";
import cln from "classnames";
import Elevation from "../Elevation";

export interface AssistChipProps extends ButtonProps {
  children?: ReactNode
}

export default function AssistChip(props: AssistChipProps) {
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
      <FocusRing></FocusRing>
      <Button disabled={disabled} {...rest}>
        {children}
      </Button>
    </div>
  )
}
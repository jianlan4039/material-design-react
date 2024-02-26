import React, {ReactNode} from 'react'
import Button, {ButtonProps} from "./content/Button";
import Outline from "../Outline/Outline";
import FocusRing from "../Focus/FocusRing";
import cln from "classnames";
import './SuggestionChip.scss'
import Elevation from "../Elevation";

export interface SuggestionChipProps extends ButtonProps {
  children?: ReactNode
}

export default function SuggestionChip(props: SuggestionChipProps) {
  const {
    children,
    disabled,
    elevated,
    ...rest
  } = props

  return (
    <div
      className={cln('nd-suggestion-chip', {
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
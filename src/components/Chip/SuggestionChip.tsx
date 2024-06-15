import React, {forwardRef, ReactNode} from 'react'
import Button, {ButtonHandle, ButtonProps} from "./internal/Button";
import Outline from "../Outline/Outline";
import cln from "classnames";
import './SuggestionChip.scss'
import Elevation from "../Elevation";

export interface SuggestionChipProps extends ButtonProps {
  children?: ReactNode
}

export interface SuggestionChipHandle extends ButtonHandle {
}

const SuggestionChip = forwardRef<SuggestionChipHandle, SuggestionChipProps>((props, ref) => {
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
      <Button ref={ref} disabled={disabled} {...rest}>
        {children}
      </Button>
    </div>
  )
})

export default SuggestionChip
import React, {forwardRef, ReactNode} from 'react'
import Button, {ButtonProps} from "./internal/Button";
import Outline from "../Outline/Outline";
import FocusRing from "../Focus/FocusRing";
import cln from "classnames";
import './SuggestionChip.scss'
import Elevation from "../Elevation";

export interface SuggestionChipProps extends ButtonProps {
  children?: ReactNode
}

const SuggestionChip = forwardRef<HTMLButtonElement, SuggestionChipProps>((props: SuggestionChipProps, ref) => {
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
      {!disabled && <FocusRing></FocusRing>}
      <Button ref={ref} disabled={disabled} {...rest}>
        {children}
      </Button>
    </div>
  )
})

export default SuggestionChip
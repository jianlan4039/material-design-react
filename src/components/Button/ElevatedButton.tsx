import React, {HTMLAttributes, ReactNode} from 'react'
import './ElevatedButton.scss'
import ElevatedButtonContent, {ElevatedButtonContentProps} from "./content/ElevatedButtonContent";
import StateLayer from "../StateLayer";
import Elevation from "../Elevation";
import FocusRing from "../Focus/FocusRing";

export interface ElevatedButtonProps extends ElevatedButtonContentProps {
  children?: ReactNode
}

export default function ElevatedButton(props: ElevatedButtonProps) {
  const {
    children,
    ...rest
  } = props


  const focusHandler = () => {
    console.log('elevated button focused!')
  }


  return (
    <div className={'nd-elevated-button'} onFocus={focusHandler}>
      <FocusRing></FocusRing>
      <Elevation></Elevation>
      <StateLayer></StateLayer>
      <ElevatedButtonContent {...rest}>
        {children}
      </ElevatedButtonContent>
    </div>
  )
}
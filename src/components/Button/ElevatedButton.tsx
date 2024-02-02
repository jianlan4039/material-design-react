import React, {HTMLAttributes, ReactNode} from 'react'
import './ElevatedButton.scss'
import ElevatedButtonContent, {ElevatedButtonContentProps} from "./content/ElevatedButtonContent";
import StateLayer from "../StateLayer";
import Elevation from "../Elevation";

export interface ElevatedButtonProps extends ElevatedButtonContentProps {
  children?: ReactNode
}

export default function ElevatedButton(props: ElevatedButtonProps) {
  const {
    children,
    ...rest
  } = props

  return (
    <div className={'nd-elevated-button'}>
      <Elevation></Elevation>
      <StateLayer></StateLayer>
      <ElevatedButtonContent {...rest}>
        {children}
      </ElevatedButtonContent>
    </div>
  )
}
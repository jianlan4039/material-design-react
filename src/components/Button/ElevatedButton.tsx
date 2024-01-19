import React, {ReactNode} from 'react'
import './ElevatedButton.scss'
import ElevatedButtonContent from "./content/ElevatedButtonContent";
import StateLayer from "../StateLayer";
import Elevation from "../Elevation";

export interface ElevatedButtonProps {
  children?: ReactNode
}

export default function ElevatedButton(props: ElevatedButtonProps) {
  const {
    children,
    ...rest
  } = props

  return (
    <div className={'nd-elevated-button'}>
      <Elevation>
        <StateLayer>
          <ElevatedButtonContent>
            {children}
          </ElevatedButtonContent>
        </StateLayer>
      </Elevation>
    </div>
  )
}
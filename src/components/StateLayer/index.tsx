
import React, {ReactNode} from 'react'
import cln from 'classnames'
import 'index.scss'

export interface StateLayerProps {
  children?: ReactNode
}

export default function StateLayer(props: StateLayerProps) {
  const {
    children,
    ...rest
  } = props

  return <div className={'nd-state-layer'}>
    {children}
  </div>
}
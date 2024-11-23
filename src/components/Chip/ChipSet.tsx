import React, {ReactNode} from 'react'
import './ChipSet.scss'

export interface ChipSetProps {
  children?: ReactNode
}

export default function ChipSet(props: ChipSetProps) {
  const {
    children
  } = props

  return (
    <div className={'nd-chip-set'}>
      {children}
    </div>
  )
}
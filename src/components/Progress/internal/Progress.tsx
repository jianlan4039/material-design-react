import {ReactNode} from 'react'

export interface ProgressProps {
  children?: ReactNode
  value?: number
  max?: number
}
import React, {forwardRef, ReactNode} from 'react'
import './CircularProgress.scss'
import {ProgressProps} from "./internal/Progress";

export interface CircularProgressProps extends ProgressProps {
  children?: ReactNode
  indeterminate?: boolean
  fourColor?: boolean
}

const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>((props, ref) => {
  const {
    children,
    value = 0,
    max = 1,
    indeterminate = false,
    fourColor = false,
    ...rest
  } = props


  const indeterminateCircularProgress = () => {
    const dashOffset = (1 - value / max) * 100
    return (
      <div className={'circular-progress'}>
        <svg viewBox={'0 0 4800 4800'}>
          <circle className={'track'} pathLength={100}></circle>
          <circle className={'active-track'} pathLength={100} strokeDashoffset={dashOffset}></circle>
        </svg>
      </div>
    )
  }

  const determinateCircularProgress = () => {
    return (
      <div className={`circular-progress indeterminate`}>
        <div className={`spinner ${fourColor ? 'four-color' : ''}`}>
          <div className="left">
            <div className="circle"></div>
          </div>
          <div className="right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    )
  }
  return indeterminate ? determinateCircularProgress() : indeterminateCircularProgress()
})

export default CircularProgress;
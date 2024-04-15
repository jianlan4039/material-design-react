import React, {CSSProperties, ReactNode} from 'react'
import {ProgressProps} from "./internal/Progress";
import './LinearProgress.scss'

export interface LinearProgressProps extends ProgressProps {
  children?: ReactNode
  buffer?: number
}

export default function LinearProgress(props: LinearProgressProps) {
  const {
    children,
    indeterminate,
    value = 0,
    max = 1,
    buffer = 1,
    fourColor,
    ...rest
  } = props

  const dotStyles: CSSProperties = {
    transform: `scaleX(${(indeterminate ? 1 : buffer / max) * 100}%)`,
  };

  const progressStyles: CSSProperties = {
    transform: `scaleX(${(indeterminate ? 1 : value / max) * 100}%)`,
  };

  return (
    <div className={`linear-progress ${indeterminate ? 'indeterminate' : ''} ${fourColor ? 'four-color' : ''}`}>
      <div className={'linear-progress__dots-bar'}></div>
      <div className={'linear-progress__inactive-track'} style={{...dotStyles}}></div>
      <div className={'linear-progress__bar linear-progress__bar--primary'} style={{...progressStyles}}>
        <div className={'linear-progress__bar__inner'}></div>
      </div>
      <div className={'linear-progress__bar linear-progress__bar--secondary'}>
        <div className={'linear-progress__bar__inner'}></div>
      </div>
    </div>
  )
}
import React, {CSSProperties, forwardRef, ReactNode, useEffect, useRef, useState} from 'react'
import {alignToAnchor} from "../internal/alignment/locate";
import {Corner} from "../internal/alignment/geometry";
import './RichTooltip.scss'
import Elevation from "../Elevation";

export interface RichTooltipProps {
  children?: ReactNode
  subhead?: string
  supportingText?: string
  action?: ReactNode
  anchorCorner?: Corner
  tooltipCorner?: Corner
  offsetX?: number
  offsetY?: number
}

const RichTooltip = forwardRef<HTMLDivElement, RichTooltipProps>((props, ref) => {
  const {
    children,
    subhead,
    supportingText,
    action,
    anchorCorner = Corner.END_START,
    tooltipCorner = Corner.START_START,
    offsetX= 0,
    offsetY = 8,
    ...rest
  } = props

  const rootRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<CSSProperties>()
  const [isVisible, setIsVisible] = useState<boolean | undefined>(undefined)
  const enterTimeoutId = useRef<NodeJS.Timeout>()
  const leaveTimeoutId = useRef<NodeJS.Timeout>()

  const mouseEnterHandler = () => {
    clearTimeout(leaveTimeoutId.current)
    enterTimeoutId.current = setTimeout(() => {
      setIsVisible(true)
    }, 500)
  }

  const mouseLeaveHandler = () => {
    clearTimeout(enterTimeoutId.current)
    leaveTimeoutId.current = setTimeout(() => {
      setIsVisible(false)
    }, 500)
  }

  useEffect(() => {
    if (anchorRef.current && tooltipRef.current) {
      setPosition(alignToAnchor(anchorRef.current, tooltipRef.current, anchorCorner, tooltipCorner, offsetX, offsetY))
      setIsVisible(false)
    }
  }, [anchorRef, tooltipRef]);

  return (
    <div ref={rootRef} className={'tooltip__host'} {...rest}>
      <div
        ref={anchorRef}
        className={'tooltip__anchor'}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        {children}
      </div>
      <div
        ref={tooltipRef}
        className={`tooltip--rich ${isVisible === true && 'tooltip--rich--visible'} ${isVisible === false && 'tooltip--rich--hidden'}`}
        style={{...position}}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        <Elevation></Elevation>
        <div className={'tooltip--rich__subhead'}>{subhead}</div>
        <div className={'tooltip--rich__supporting-text'}>{supportingText}</div>
        <div className={'tooltip--rich__actions'}>{action}</div>
      </div>
    </div>
  )
})

export default RichTooltip;
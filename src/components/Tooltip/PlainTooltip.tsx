import React, {ComponentType, CSSProperties, forwardRef, ReactNode, useEffect, useRef, useState} from 'react'
import {alignToAnchor} from "../internal/alignment/locate";
import {Corner} from "../internal/alignment/geometry";
import './PlainTooltip.scss'

export interface PlainTooltipProps {
  children?: ReactNode
  text?: string
  anchorCorner?: Corner
  tooltipCorner?: Corner
}

const PlainTooltip = forwardRef<HTMLDivElement, PlainTooltipProps>((props, ref) => {
  const {
    children,
    text,
    anchorCorner = Corner.START_START,
    tooltipCorner = Corner.END_START,
    ...rest
  } = props

  const anchorRef = useRef<HTMLDivElement>(null);
  const toolTipRef = useRef<HTMLDivElement>(null);
  const visibleTimeoutId = useRef<NodeJS.Timeout>()
  const [position, setPosition] = useState<CSSProperties>()
  const [isHidden, setIsHidden] = useState<boolean | undefined>()


  const mouseEnterHandler = () => {
    visibleTimeoutId.current = setTimeout(() => {
      setIsHidden(false)
    }, 500)
  }

  const mouseLeaveHandler = () => {
    clearTimeout(visibleTimeoutId.current)
    setIsHidden(true)
  }

  useEffect(() => {
    if (anchorRef.current && toolTipRef.current) {
      setPosition(alignToAnchor(anchorRef.current, toolTipRef.current, anchorCorner, tooltipCorner, 0, -8))
      setIsHidden(true)
    }
  }, [anchorRef, toolTipRef]);

  return (
    <div className={'tooltip__host'}>
      <div
        ref={anchorRef}
        className={'tooltip__anchor'}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        {children}
      </div>
      <div
        ref={toolTipRef}
        style={{...position}}
        className={`tooltip--plain ${isHidden === true && 'tooltip--plain--hidden'} ${isHidden === false && 'tooltip--plain--visible'}`}
        {...rest}
      >
        {text}
      </div>
    </div>
  )
})

export default PlainTooltip;
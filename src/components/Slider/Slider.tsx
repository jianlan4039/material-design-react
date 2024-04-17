import React, {ReactNode, useRef, MouseEvent as ReactMouseEvent, useState, useEffect} from 'react'
import './Slider.scss'
import c from 'classnames'
import Handle from "./internal/Handle";

export interface SliderProps {
  children?: ReactNode
  step?: number
  min?: number
  max?: number
  value?: number
  valueStart?: number
  valueEnd?: number
  labeled?: boolean
  valueLabel?: string
  valueLabelStart?: string
  valueLabelEnd?: string
  range?: boolean
}

export default function Slider(props: SliderProps) {
  const {
    children,
    value = 0,
    min = 0,
    max = 100,
    range,
    valueLabel,
    valueStart,
    valueEnd,
    valueLabelStart,
    valueLabelEnd,
    ...rest
  } = props

  const isDragging = useRef<boolean>(false);
  const root = useRef<HTMLDivElement>(null);
  const size = useRef<number>(0);

  const _primaryHandleX = useRef<number>(value);
  const _secondHandleX = useRef<number>(0);
  const activeHandle = useRef<"primary" | "second">("primary");

  const [primaryHandleMovementX, setPrimaryHandleMovementX] = useState<number>(0)
  const [secondHandleMovementX, setSecondHandleMovementX] = useState<number>(0)

  const calculateValue = (distance: number) => {
    return Math.round(min + (distance / size.current) * (max - min))
  }

  const validDistance = (distance: number, min: number, max: number) => {
    return distance > min ? (distance < max ? distance : max) : (min)
  }

  const determineWhichHandle = (distance: number) => {
    const willMoveTo = validDistance(distance, 0, size.current)
    const deltaDistance = _primaryHandleX.current - _secondHandleX.current

    if (willMoveTo >= _primaryHandleX.current) {
      activeHandle.current = 'primary'
    } else if (willMoveTo >= (_secondHandleX.current + deltaDistance / 2)) {
      activeHandle.current = 'primary'
    } else {
      activeHandle.current = 'second'
    }
  }

  const handleMouseDownHandler = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!root.current) return;
    const rect = root.current.getBoundingClientRect()
    // setMovement(e.clientX - rect.x)
    const distance = validDistance(e.clientX - rect.x, 0, size.current)
    determineWhichHandle(distance)
    if (activeHandle.current === 'primary') {
      _primaryHandleX.current = distance
      setPrimaryHandleMovementX(distance)
    } else {
      _secondHandleX.current = distance
      setSecondHandleMovementX(distance)
    }

    isDragging.current = true
  }

  const mouseUpHandler = (e: MouseEvent) => {
    e.preventDefault()
    if (!root.current) return;
    const rect = root.current.getBoundingClientRect()
    isDragging.current = false
  }

  const mouseMoveHandler = (e: MouseEvent) => {
    e.preventDefault()
    if (!isDragging.current || !root.current || !size.current) return;
    const rect = root.current.getBoundingClientRect()
    const distance = validDistance(e.clientX - rect.x, 0, size.current)
    if (activeHandle.current === 'primary') {
      if (distance >= _secondHandleX.current) {
        setPrimaryHandleMovementX(distance)
        _primaryHandleX.current = distance
      }
    } else {
      if (distance <= _primaryHandleX.current) {
        setSecondHandleMovementX(distance)
        _secondHandleX.current = distance
      }
    }
  }

  useEffect(() => {
    if (root.current) {
      size.current = root.current.getBoundingClientRect().width
      document.addEventListener('mouseup', mouseUpHandler)
      document.addEventListener('mousemove', mouseMoveHandler)
    }
    if (range) {
      _primaryHandleX.current = valueStart || 0
      _secondHandleX.current = valueEnd || 0
    } else {
      _primaryHandleX.current = value || 0
    }

    return () => {
      document.removeEventListener('mouseup', mouseUpHandler)
      document.removeEventListener('mousemove', mouseMoveHandler)
    }
  }, [root]);

  return (
    <div
      ref={root}
      className={c('slider', {'range': range})}
      onMouseDown={handleMouseDownHandler}
    >
      {
        range &&
        <>
          <div className={'inactive-track left'} style={{inlineSize: `${secondHandleMovementX}px`}}></div>
          <Handle className={'supporting'} position={secondHandleMovementX} label={'support handle'}></Handle>
        </>
      }
      <div
        className={c('active-track')}
        style={{inlineSize: `${range ? primaryHandleMovementX - secondHandleMovementX : primaryHandleMovementX}px`}}
      ></div>
      <div className={'inactive-track'}></div>
      <Handle position={primaryHandleMovementX} label={'handle'}></Handle>
      <div className={'stop-container'}>
        <div className={'stop'}></div>
      </div>
    </div>
  )
}
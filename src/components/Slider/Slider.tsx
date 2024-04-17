import React, {ReactNode, useRef, MouseEvent as ReactMouseEvent, useState, useEffect, useId} from 'react'
import './Slider.scss'
import c from 'classnames'
import Handle from "./internal/Handle";

export interface SliderProps {
  id?: string
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

type ActiveHandle = 'PRIMARY' | 'SECOND' | undefined;

export default function Slider(props: SliderProps) {
  const {
    id = useId(),
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

  const root = useRef<HTMLDivElement>(null);
  const size = useRef<number>(0);

  const _activeHandle = useRef<ActiveHandle>(undefined);

  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [primaryHandleMovementX, setPrimaryHandleMovementX] = useState<number>(0)
  const [secondHandleMovementX, setSecondHandleMovementX] = useState<number>(0)

  const calculateValue = (distance: number) => {
    return Math.round(min + (distance / size.current) * (max - min))
  }

  const calculateDistance = (value: number) => {
    if (value < min || value > max) {
      console.warn(`value for slider ${id} is not valid`)
    }
    return value * (size.current / (max - min))
  }

  const validDistance = (distance: number, min: number, max: number) => {
    return distance > min ? (distance < max ? distance : max) : (min)
  }

  const determineWhichHandle = (distance: number) => {
    const willMoveTo = validDistance(distance, 0, size.current)
    const deltaDistance = primaryHandleMovementX - secondHandleMovementX

    if (willMoveTo >= primaryHandleMovementX) {
      _activeHandle.current = 'PRIMARY'
      return 'PRIMARY'
    } else if (willMoveTo >= (secondHandleMovementX + deltaDistance / 2)) {
      _activeHandle.current = 'PRIMARY'
      return 'PRIMARY'
    } else {
      _activeHandle.current = 'SECOND'
      return 'SECOND'
    }
  }

  const setMovement = (clientX: number) => {
    if (!root.current) return;
    const rect = root.current.getBoundingClientRect()
    const moveTo = validDistance(clientX - rect.x, 0, size.current)
    if (range) {
      if ('PRIMARY' === determineWhichHandle(moveTo)) {
        setPrimaryHandleMovementX(moveTo)
      } else {
        setSecondHandleMovementX(moveTo)
      }
    } else {
      setPrimaryHandleMovementX(moveTo)
    }
  }

  const draggingHandle = (clientX: number) => {
    if (!root.current || !size.current) return;
    const rect = root.current.getBoundingClientRect()
    const distance = validDistance(clientX - rect.x, 0, size.current)
    if (_activeHandle.current === 'PRIMARY') {
      if (distance >= secondHandleMovementX) {
        setPrimaryHandleMovementX(distance)
      }
    } else {
      if (distance <= primaryHandleMovementX) {
        setSecondHandleMovementX(distance)
      }
    }
  }

  const handleMouseDownHandler = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setMovement(e.clientX)
    setIsDragging(true)
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  const mouseUpHandler = (e: MouseEvent) => {
    e.preventDefault()
    _activeHandle.current = undefined
    setIsDragging(false)
    document.removeEventListener('mouseup', mouseUpHandler)
    document.removeEventListener('mousemove', mouseMoveHandler)
  }

  const mouseMoveHandler = (e: MouseEvent) => {
    e.preventDefault()
    draggingHandle(e.clientX)
  }

  useEffect(() => {
    if (root.current) {
      size.current = root.current.getBoundingClientRect().width
      if (range) {
        if (valueStart) {
          const distance = calculateDistance(valueStart)
          setSecondHandleMovementX(distance)
        }
        if (valueEnd) {
          const distance = calculateDistance(valueEnd)
          setPrimaryHandleMovementX(distance)
        }

        if (valueStart && valueEnd && valueStart > valueEnd) {
          console.warn(`invalid valueStart and valueEnd for slider ${id}`)
        }
      } else {
        value && setPrimaryHandleMovementX(calculateDistance(value))
      }
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
          <Handle
            className={c('second', {'pressed': _activeHandle.current === 'SECOND'})}
            position={secondHandleMovementX}
            label={'support handle'}
          ></Handle>
        </>
      }
      <div
        className={c('active-track')}
        style={{
          inlineSize: `${range ? primaryHandleMovementX - secondHandleMovementX : primaryHandleMovementX}px`
        }}
      ></div>
      <div className={'inactive-track'}></div>
      <Handle
        position={primaryHandleMovementX}
        label={'handle'}
        className={c({'pressed': _activeHandle.current === 'PRIMARY'})}
      ></Handle>
      <div className={'stop-container'}>
        <div className={'stop'}></div>
      </div>
    </div>
  )
}
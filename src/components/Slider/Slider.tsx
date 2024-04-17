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

  const isDragging = useRef<boolean>(false);
  const root = useRef<HTMLDivElement>(null);
  const size = useRef<number>(0);

  const _primaryHandleX = useRef<number>(value);
  const _secondHandleX = useRef<number>(0);
  const _activeHandle = useRef<ActiveHandle>(undefined);

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
    const deltaDistance = _primaryHandleX.current - _secondHandleX.current

    if (willMoveTo >= _primaryHandleX.current) {
      _activeHandle.current = 'PRIMARY'
      return 'PRIMARY'
    } else if (willMoveTo >= (_secondHandleX.current + deltaDistance / 2)) {
      _activeHandle.current = 'PRIMARY'
      return 'PRIMARY'
    } else {
      _activeHandle.current = 'SECOND'
      return 'SECOND'
    }
  }

  const handleMouseDownHandler = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!root.current) return;
    const rect = root.current.getBoundingClientRect()
    const distance = validDistance(e.clientX - rect.x, 0, size.current)
    let activeHandle: ActiveHandle = undefined
    if (range) {
      activeHandle = determineWhichHandle(distance)
    } else {
      activeHandle = 'PRIMARY'
    }
    if (_activeHandle.current === 'PRIMARY') {
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
    _activeHandle.current = undefined
  }

  const mouseMoveHandler = (e: MouseEvent) => {
    e.preventDefault()
    if (!isDragging.current || !root.current || !size.current) return;
    const rect = root.current.getBoundingClientRect()
    const distance = validDistance(e.clientX - rect.x, 0, size.current)
    if (_activeHandle.current === 'PRIMARY') {
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

      if (range) {
        if (valueStart) {
          const distance = calculateDistance(valueStart)
          setSecondHandleMovementX(distance)
          _secondHandleX.current = distance
        }
        if (valueEnd) {
          const distance = calculateDistance(valueEnd)
          setPrimaryHandleMovementX(calculateDistance(valueEnd))
          _primaryHandleX.current = distance
        }

        if (valueStart && valueEnd && valueStart > valueEnd) {
          console.warn(`invalid valueStart and valueEnd for slider ${id}`)
        }
      } else {
        value && setPrimaryHandleMovementX(calculateDistance(value))
      }
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
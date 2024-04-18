import React, {ReactNode, useRef, MouseEvent as ReactMouseEvent, useState, useEffect, useId, CSSProperties} from 'react'
import './Slider.scss'
import c from 'classnames'
import Handle from "./internal/Handle";

export interface SliderProps {
  id?: string
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
  disabled?: boolean
  size?: number
}

type ActiveHandle = 'PRIMARY' | 'SECOND' | undefined;

declare module 'react' {
  interface CSSProperties {
    '--_slider-ticks-count'?: number
    '--_slider-size'?: string
    '--_primary-handle'?: string
    '--_second-handle'?: string
  }
}

export default function Slider(props: SliderProps) {
  const {
    id = useId(),
    value = 0,
    min = 0,
    max = 100,
    range,
    valueLabel,
    valueStart,
    valueEnd,
    valueLabelStart,
    valueLabelEnd,
    disabled,
    step = 0,
    size = 200,
    labeled,
    ...rest
  } = props

  const root = useRef<HTMLDivElement>(null);
  const rootRect = useRef<DOMRect>();
  const _activeHandle = useRef<ActiveHandle>(undefined);
  // const [customProps, setCustomProps] = useState<CSSProperties>()
  const customProps = useRef<CSSProperties>({
    '--_slider-ticks-count': (max / step),
    '--_slider-size': `${size}px`,
    '--_primary-handle': '0px',
    '--_second-handle': '0px'
  });
  const lastPosition = useRef<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [primaryHandleMovementX, setPrimaryHandleMovementX] = useState<number>(0)
  const [secondHandleMovementX, setSecondHandleMovementX] = useState<number>(0)

  const calculateValue = (distance: number) => {
    const result = Math.round(min + (distance / size) * (max - min))
    if (isNaN(result)) {
      return 0;
    }
    return result
  }

  const calculateDistance = (value: number) => {
    if (value < min || value > max) {
      console.warn(`value for slider ${id} is not valid`)
    }
    return value * (size / (max - min))
  }

  const validDistance = (distance: number, min: number, max: number) => {
    return distance > min ? (distance < max ? distance : max) : (min)
  }

  const determineWhichHandle = (distance: number) => {
    const willMoveTo = validDistance(distance, 0, size)
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

  function roundMovementTo(moveTo: number) {
    let _value = calculateValue(moveTo)
    if (step && _value % step !== 0) {
      let left = 0, right = 0;
      for (let i = 0; i < max / step; i++) {
        const difference = _value - (min + step * i)
        const absDiff = Math.abs(difference)
        if (absDiff < step && difference > 0) {
          right = left = min + step * i
        }
        if (absDiff < step && difference < 0) {
          right = min + step * i
        }
      }
      _value - left > right - _value ? (moveTo = calculateDistance(right)) : (moveTo = calculateDistance(left));
    }
    return moveTo;
  }

  const setMovement = (clientX: number) => {
    if (!rootRect.current) return;
    let moveTo = roundMovementTo(validDistance(clientX - rootRect.current.x, 0, size));
    lastPosition.current = moveTo
    if (range && 'SECOND' === determineWhichHandle(moveTo)) {
      setSecondHandleMovementX(moveTo)
      _activeHandle.current = 'SECOND'
      customProps.current['--_second-handle'] = `${moveTo}px`
    } else {
      setPrimaryHandleMovementX(moveTo)
      _activeHandle.current = 'PRIMARY'
      customProps.current['--_primary-handle'] = `${moveTo}px`
    }
  }

  const draggingHandle = (clientX: number) => {
    if (!size || !rootRect.current) return;
    let distance = roundMovementTo(validDistance(clientX - rootRect.current.x, 0, size))
    if (step && Math.abs(distance - lastPosition.current) < step) {
      return;
    }
    if (_activeHandle.current === 'PRIMARY' && distance >= secondHandleMovementX) {
      setPrimaryHandleMovementX(distance)
      customProps.current['--_primary-handle'] = `${distance}px`
    } else if (distance <= primaryHandleMovementX) {
      setSecondHandleMovementX(distance)
      customProps.current['--_second-handle'] = `${distance}px`
    }
    lastPosition.current = distance
  }

  const handleMouseDownHandler = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (disabled || !root.current) return;
    rootRect.current = root.current.getBoundingClientRect()
    e.preventDefault()
    setMovement(e.clientX)
    setIsDragging(true)
    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  const mouseUpHandler = (e: MouseEvent) => {
    if (disabled) return;
    e.preventDefault()
    _activeHandle.current = undefined
    setIsDragging(false)
    document.removeEventListener('mouseup', mouseUpHandler)
    document.removeEventListener('mousemove', mouseMoveHandler)
  }

  const mouseMoveHandler = (e: MouseEvent) => {
    if (disabled) return;
    e.preventDefault()
    draggingHandle(e.clientX)
  }

  useEffect(() => {
    if (root.current) {
      if (step) {
      }
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
    <div className={'slider-container'} onMouseDown={handleMouseDownHandler}>
      <div
        ref={root}
        className={c('slider', {'range': range, 'disabled': disabled})}
        style={{...customProps.current}}
      >
        {
          range &&
          <>
            <div className={'inactive-track left'} style={{inlineSize: `${secondHandleMovementX}px`}}></div>
            <Handle
              className={c('second', {'pressed': isDragging && _activeHandle.current === 'SECOND'})}
              label={valueLabelEnd || calculateValue(secondHandleMovementX)}
              position={secondHandleMovementX}
              labeled={labeled && isDragging}
            ></Handle>
          </>
        }
        <input type="number" min={min} max={max} disabled={disabled}/>
        <div
          className={c('active-track')}
          style={{
            inlineSize: `${range ? primaryHandleMovementX - secondHandleMovementX : primaryHandleMovementX}px`
          }}
        ></div>
        <div className={c('inactive-track')}></div>
        <Handle
          position={primaryHandleMovementX}
          label={valueLabel || valueLabelStart || calculateValue(primaryHandleMovementX)}
          className={c({'pressed': isDragging && _activeHandle.current === 'PRIMARY'})}
          labeled={labeled && isDragging}
        ></Handle>
        <div className={'tick-marks'}></div>
      </div>
    </div>
  )
}
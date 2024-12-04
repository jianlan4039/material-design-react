import React, {
  useRef,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  useState,
  useEffect,
  useId,
  CSSProperties, forwardRef
} from 'react'
import './Slider.scss'
import c from 'classnames'
import Handle from "./internal/Handle";

export interface ISliderProps {
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
  onChange?:(value: number) => void
  onRangeChange?:(values: number[]) => void
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

const Slider: React.FC<ISliderProps> = forwardRef<HTMLDivElement, ISliderProps>((props, ref) => {
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
    onChange,
    onRangeChange,
    ...rest
  } = props

  const root = useRef<HTMLDivElement>(null);
  const rootRect = useRef<DOMRect>();
  const activeHandle = useRef<ActiveHandle>(undefined);
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

  useEffect(() => {
    if (root.current) {
      if (range) {
        if (valueStart) {
          const distance = calculateDistance(valueStart)
          customProps.current['--_second-handle'] = `${distance}px`
          setSecondHandleMovementX(distance)
        }
        if (valueEnd) {
          const distance = calculateDistance(valueEnd)
          customProps.current['--_primary-handle'] = `${distance}px`
          setPrimaryHandleMovementX(distance)
        }

        if (valueStart && valueEnd && valueStart > valueEnd) {
          console.warn(`invalid valueStart and valueEnd for slider ${id}`)
        }
      } else {
        if (value) {
          const distance = calculateDistance(value)
          customProps.current['--_primary-handle'] = `${distance}px`
          setPrimaryHandleMovementX(distance)
        }
      }
    }
  }, [root]);

  useEffect(() => {
    if (!range) {
      setSecondHandleMovementX(0)
      customProps.current['--_second-handle'] = `${0}px`
    }
  }, [range]);

  /**
   * 根据输入的物理距离（单位px）来计算对应的有效值。
   * @param distance 物理距离（单位px）
   */
  const calculateValue = (distance: number) => {
    const result = Math.round(min + (distance / size) * (max - min))
    if (isNaN(result)) {
      return 0;
    }
    return result
  }

  /**
   * 根据输入的有效值来计算对应的物理距离（单位px）。
   * @param value 有效值
   */
  const calculateDistance = (value: number) => {
    if (value < min || value > max) {
      console.warn(`value for slider ${id} is not valid`)
    }
    return value * (size / (max - min))
  }

  /**
   * 检验距离（单位px）是否有效，超过最大值返回最大值，小于最小值返回最小值，在有效范围内则返回原值。
   * 当范围功能启动时，主滑块的最小值不能低于次滑块，次滑块的值不能高于主滑块。
   * @param distance 距离值
   * @param min 距离值最小值
   * @param max 距离值最大值
   */
  const validDistance = (distance: number, min: number, max: number) => {
    return distance > min ? (distance < max ? distance : max) : (min)
  }


  const determineWhichHandle = (distance: number) => {
    if (!rootRect.current) return;
    const deltaDistance = primaryHandleMovementX - secondHandleMovementX
    if ((distance >= ((deltaDistance / 2) + secondHandleMovementX)) || !range) {
      activeHandle.current = 'PRIMARY'
      return 'PRIMARY'
    } else {
      activeHandle.current = 'SECOND'
      return 'SECOND'
    }
  }

  function roundMovementTo(moveTo: number) {
    if (!rootRect.current) return moveTo;
    let _value = calculateValue(moveTo)
    let calcMoveTo: number = moveTo
    if (step && _value % step !== 0) {
      let left = 0, right = 0;
      for (let i = 0; i < (Math.ceil(max / step) + 1); i++) {
        const difference = _value - (min + step * i)
        const absDiff = Math.abs(difference)
        if (absDiff < step) {
          if (difference > 0) {
            right = left = min + step * i
          } else {
            right = min + step * i
          }
        }
      }
      if (right >= max && (moveTo - calculateDistance(left) > 15)) {
        // 当处于这种状态时，点击点处于边界值，最右边
        calcMoveTo = calculateDistance(right)
      } else {
        _value - left > right - _value ? (calcMoveTo = calculateDistance(right)) : (calcMoveTo = calculateDistance(left));
      }
    }
    return validDistance(calcMoveTo, 0, rootRect.current?.width)
  }

  const setMovement = (clientX: number) => {
    if (!rootRect.current) return;
    const moveTo = clientX - rootRect.current.x
    const validMovement = roundMovementTo(moveTo);
    determineWhichHandle(validMovement)
    if (range && 'SECOND' === activeHandle.current) {
      setSecondHandleMovementX(validMovement)
      activeHandle.current = 'SECOND'
      customProps.current['--_second-handle'] = `${validMovement}px`
    } else if ('PRIMARY' === activeHandle.current) {
      setPrimaryHandleMovementX(validMovement)
      activeHandle.current = 'PRIMARY'
      customProps.current['--_primary-handle'] = `${validMovement}px`
    }
  }

  const draggingHandle = (clientX: number) => {
    if (!size || !rootRect.current || !activeHandle.current) return;
    let distance = roundMovementTo(validDistance(clientX - rootRect.current.x, 0, rootRect.current?.width))

    // 防止抖动
    if (step && Math.abs(distance - lastPosition.current) < 10) {
      return;
    }

    if (activeHandle.current === 'PRIMARY' && distance >= secondHandleMovementX) {
      setPrimaryHandleMovementX(distance)
      customProps.current['--_primary-handle'] = `${distance}px`
    } else if (activeHandle.current === 'SECOND' && distance <= primaryHandleMovementX) {
      setSecondHandleMovementX(distance)
      customProps.current['--_second-handle'] = `${distance}px`
    }
    lastPosition.current = distance
  }

  const handleMouseDownHandler = (e: ReactMouseEvent<HTMLDivElement> | ReactTouchEvent<HTMLDivElement>) => {
    if (disabled || !root.current) return;
    rootRect.current = root.current.getBoundingClientRect()
    if ('touches' in e) {
      setMovement(e.touches[0].clientX)
    } else {
      e.preventDefault()
      setMovement(e.clientX)
    }
    setIsDragging(true)
  }

  const mouseUpHandler = (e: ReactMouseEvent | ReactTouchEvent) => {
    if (disabled) return;
    if (!('touches' in e)) {
      e.preventDefault()
    }
    setIsDragging(false)
  }

  const mouseMoveHandler = (e: ReactMouseEvent | ReactTouchEvent) => {
    if (disabled || !isDragging) return;
    if ('touches' in e) {
      const {clientX} = e.touches[0]
      draggingHandle(clientX)
    } else {
      draggingHandle(e.clientX)
    }
  }

  const secondaryHandleMouseDown = (e: ReactMouseEvent | ReactTouchEvent) => {
    if (disabled) return;
    e.stopPropagation()
    if (!root.current) return;
    rootRect.current = root.current.getBoundingClientRect()
    activeHandle.current = 'SECOND'
    setIsDragging(true)
  }

  const primaryHandleMouseDown = (e: ReactMouseEvent | ReactTouchEvent) => {
    if (disabled) return;
    e.stopPropagation()
    if (!root.current) return;
    rootRect.current = root.current.getBoundingClientRect()
    activeHandle.current = 'PRIMARY'
    setIsDragging(true)
  }

  const handleUpHandler = () => {
    setIsDragging(false)
    activeHandle.current = undefined
    if(range){
      onRangeChange?.([calculateValue(secondHandleMovementX), calculateValue(primaryHandleMovementX)])
    }else {
      onChange?.(calculateValue(primaryHandleMovementX))
    }
  };

  return (
    <div
      ref={ref}
      className={'nd-slider-container'}
      onMouseDown={handleMouseDownHandler}
      onTouchStart={handleMouseDownHandler}
      onMouseMove={mouseMoveHandler}
      onTouchMove={mouseMoveHandler}
      onMouseUp={handleUpHandler}
      onTouchEnd={mouseUpHandler}
      {...rest}
    >
      <div
        ref={root}
        className={c('slider', {'range': range, 'disabled': disabled})}
        style={{...customProps.current}}
      >
        <div className={c('slider-touch', {'slider-touch--dragging': isDragging})}></div>
        {
          range &&
          <>
            <div className={'inactive-track left'} style={{inlineSize: `${secondHandleMovementX}px`}}></div>
            <Handle
              className={c('second', {'pressed': isDragging && activeHandle.current === 'SECOND'})}
              label={valueLabelStart || calculateValue(secondHandleMovementX)}
              position={secondHandleMovementX}
              labeled={labeled && isDragging}
              onMouseDown={secondaryHandleMouseDown}
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
          label={valueLabel || valueLabelEnd || calculateValue(primaryHandleMovementX)}
          className={c({'pressed': isDragging && activeHandle.current === 'PRIMARY'})}
          labeled={labeled && isDragging}
          onMouseDown={primaryHandleMouseDown}
          onTouchStart={primaryHandleMouseDown}
        ></Handle>
        <div className={'tick-marks'}></div>
      </div>
    </div>
  )
})

export default Slider
import React, {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react'
import Field, {FieldProps, FieldRefProps} from "./Field";
import c from 'classnames'
import {EASING} from "../../internal/motion/animation";
import SupportingText from "./SupportingText";

export interface FilledFieldProps extends FieldProps {
  children?: ReactNode
  label?: string
  supportingText?: string
}

const FilledField = (props: FilledFieldProps) => {
  const {
    children,
    label,
    onChange,
    focus: _focus,
    supportingText,
    ...rest
  } = props

  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const labelPopulated = useRef<boolean>(false);
  const indicatorActive = useRef<boolean>(false);
  const labelFrames = useRef<PropertyIndexedKeyframes[]>();

  const [value, setValue] = useState<any>()
  const [focus, setFocus] = useState(false)
  const [inputFocus, setInputFocus] = useState(_focus)

  const mouseDownHandler = () => {
    setFocus(true)
  }

  const mouseClickHandler = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    setInputFocus(true)
  }

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    setValue(e.target.value)
  }

  const getLabelAnimateFrames = () => {
    if (!labelRef.current) {
      return
    }

    const currentTopDis = labelRef.current.offsetTop
    return [
      {
        insetBlockStart: [`${currentTopDis}px`, `8px`],
        fontSize: ['1rem', '0.75rem'],
        lineHeight: ['1.5rem', '1rem']
      },
      {
        insetBlockStart: ['8px', `${currentTopDis}px`],
        fontSize: ['0.75rem', '1rem'],
        lineHeight: ['1rem', '1.5rem']
      }
    ]
  }

  const animateLabelPopulate = async (frame: PropertyIndexedKeyframes) => {
    if (!labelRef.current || labelPopulated.current) {
      return
    }
    const animate = labelRef.current.animate(frame, {
      duration: 150, easing: EASING.STANDARD, fill: 'forwards'
    })
    await animate.finished
    animate.commitStyles()
    animate.cancel()
    labelPopulated.current = true
  }

  const animateLabelRestore = async (frame: PropertyIndexedKeyframes) => {
    if (!labelRef.current || !labelPopulated.current) {
      return
    }
    const animate = labelRef.current.animate(frame, {
      duration: 150, easing: EASING.STANDARD, fill: 'forwards'
    })
    await animate.finished
    animate.commitStyles()
    animate.cancel()
    labelPopulated.current = false
  }

  const animateIndicatorActive = () => {
    if (!rootRef.current || indicatorActive.current) {
      return
    }
    const animate = rootRef.current.animate({
      height: ['1px', '3px']
    }, {duration: 150, easing: EASING.STANDARD, fill: 'forwards', pseudoElement: '::before'})
    indicatorActive.current = true
  }

  const animateIndicatorNonactive = () => {
    if (!rootRef.current || !indicatorActive.current) {
      return
    }
    const animate = rootRef.current.animate({
      height: ['3px', '1px']
    }, {duration: 100, easing: EASING.STANDARD, fill: 'forwards', pseudoElement: '::before'})
    indicatorActive.current = false
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
      setFocus(false)
      setInputFocus(false)
    }
  };

  useEffect(() => {
    if (labelRef.current) {
      labelFrames.current = getLabelAnimateFrames()
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [rootRef, labelRef]);

  useEffect(() => {
    if (!labelFrames.current) {
      return
    }
    if (focus) {
      void animateLabelPopulate(labelFrames.current[0])
      animateIndicatorActive()
    } else if (value) {
      void animateLabelPopulate(labelFrames.current[0])
      animateIndicatorNonactive()
    } else {
      void animateLabelRestore(labelFrames.current[1])
      animateIndicatorNonactive()
    }
  }, [focus, value]);

  return (
    <div
      ref={rootRef}
      className={c('nd-filled-field', {'focus': focus, 'populated': focus || value})}
      onMouseDown={mouseDownHandler}
      onClick={mouseClickHandler}
    >
      <Field onChange={inputChangeHandler} focus={inputFocus} {...rest}>
        <span ref={labelRef} className={'nd-filled-field__label'}>{label}</span>
      </Field>
      <SupportingText>
        {supportingText}
      </SupportingText>
    </div>
  )
}

export default FilledField
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
import {AnimationArgs, ElementAndAnimations, executeAnimation} from "./AnimateConfig";

interface FilledAnimations {
  label: AnimationArgs
  indicator: AnimationArgs
}

export interface FilledFieldProps extends FieldProps {
  children?: ReactNode
  supportingText?: string
  error?: boolean
  disabled?: boolean
}

const FilledField = (props: FilledFieldProps) => {
  const {
    children,
    onChange,
    focus: _focus,
    supportingText,
    error,
    disabled,
    label,
    ...rest
  } = props

  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null)

  const labelPopulated = useRef<boolean>(false);
  const indicatorActive = useRef<boolean>(false);

  const [value, setValue] = useState<any>()
  const [focus, setFocus] = useState(false)
  const [inputFocus, setInputFocus] = useState(_focus)

  const fieldFocusAnimations = useRef<FilledAnimations>();
  const fieldBlurAnimations = useRef<FilledAnimations>();

  const mouseDownHandler = (e: ReactMouseEvent) => {
    if (disabled) {
      return
    }
    e.preventDefault()
    setFocus(true)
  }

  const mouseClickHandler = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (disabled) {
      return
    }
    e.preventDefault()
    setInputFocus(true)
  }

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    setValue(e.target.value)
  }

  const setAnimateFrames = () => {
    if (!labelRef.current) {
      return
    }

    const labelTop = labelRef.current.offsetTop

    fieldFocusAnimations.current = {
      label: [
        {
          insetBlockStart: [`${labelTop}px`, `8px`],
          fontSize: ['1rem', '0.75rem'],
          lineHeight: ['1.5rem', '1rem']
        },
        {
          duration: 150, easing: EASING.STANDARD, fill: 'forwards'
        }
      ],
      indicator: [
        {
          height: ['1px', '3px']
        },
        {duration: 150, easing: EASING.STANDARD, fill: 'forwards', pseudoElement: '::before'}
      ]
    }

    fieldBlurAnimations.current = {
      label: [
        {
          insetBlockStart: ['8px', `${labelTop}px`],
          fontSize: ['0.75rem', '1rem'],
          lineHeight: ['1rem', '1.5rem']
        },
        {
          duration: 150, easing: EASING.STANDARD, fill: 'forwards'
        }
      ],
      indicator: [
        {
          height: ['3px', '1px']
        },
        {duration: 100, easing: EASING.STANDARD, fill: 'forwards', pseudoElement: '::before'}
      ]
    }
  }

  const animateFocus = () => {
    if (!labelRef.current || !rootRef.current || !fieldFocusAnimations.current || !fieldFocusAnimations.current) {
      return
    }

    const elementAndAnimations: ElementAndAnimations = []
    if (!labelPopulated.current) {
      elementAndAnimations.push([
        labelRef.current,
        fieldFocusAnimations.current.label,
        true
      ])
      labelPopulated.current = true
    }

    if (!indicatorActive.current) {
      elementAndAnimations.push([
        rootRef.current,
        fieldFocusAnimations.current.indicator,
        false
      ])
      indicatorActive.current = true
    }

    void executeAnimation(elementAndAnimations)
  }

  const animateBlur = () => {
    if (!labelRef.current || !rootRef.current || !fieldBlurAnimations.current || !fieldFocusAnimations.current) {
      return
    }

    const elementAndAnimations: ElementAndAnimations = []
    if (labelPopulated.current && !value) {
      elementAndAnimations.push([
        labelRef.current,
        fieldBlurAnimations.current.label,
        true
      ])
      labelPopulated.current = false
    }

    if (indicatorActive.current) {
      elementAndAnimations.push([
        rootRef.current,
        fieldBlurAnimations.current.indicator,
        false
      ])
      indicatorActive.current = false
    }

    void executeAnimation(elementAndAnimations)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
      setFocus(false)
      setInputFocus(false)
    }
  };

  useEffect(() => {
    if (rootRef.current && labelRef.current) {
      setAnimateFrames()
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [rootRef, labelRef]);

  useEffect(() => {
    if (focus) {
      animateFocus()
    } else {
      animateBlur()
    }
  }, [focus]);

  useEffect(() => {
    if (disabled) {

    }
  }, [disabled]);

  return (
    <div
      ref={rootRef}
      className={c('nd-filled-field', {
        'focus': focus,
        'populated': focus || value,
        'error': error,
        'disabled': disabled
      })}
      onMouseDown={mouseDownHandler}
      onClick={mouseClickHandler}
    >
      <Field
        onChange={inputChangeHandler}
        focus={inputFocus}
        disabled={disabled}
        {...rest}
      >
        <span ref={labelRef} className={'nd-field__label'}>{label}</span>
      </Field>
      {supportingText && <SupportingText>{supportingText}</SupportingText>}
    </div>
  )
}

export default FilledField
import React, {ReactNode, useEffect, useRef, useState, MouseEvent as ReactMouseEvent, ChangeEvent} from 'react'
import Field, {FieldProps, FieldRefProps} from "./Field";
import c from 'classnames'
import SupportingText from "./SupportingText";
import {EASING} from "../../internal/motion/animation";
import {AnimationArgs, ElementAndAnimations, executeAnimation} from "./AnimateConfig";

export interface OutlinedFieldAnimation {
  label: AnimationArgs
  legend: AnimationArgs
  outline: AnimationArgs
}

export interface OutlinedFieldProps extends FieldProps {
  children?: ReactNode
  label?: string
  supportingText?: string
  error?: boolean
  disabled?: boolean
}

export default function OutlinedField(props: OutlinedFieldProps) {
  const {
    children,
    label,
    supportingText,
    onChange,
    error = false,
    disabled = false,
    ...rest
  } = props

  const [populated, setPopulated] = useState(false)
  const [value, setValue] = useState<any>()
  const [focus, setFocus] = useState(false)
  const [inputFocus, setInputFocus] = useState(false)
  const [calculating, setCalculating] = useState(true)

  const legendRef = useRef<HTMLLegendElement>(null);
  const fieldRef = useRef<FieldRefProps>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLFieldSetElement>(null);
  const labelPopulated = useRef<boolean>(false);
  const legendMounted = useRef<boolean>(false);
  const outlineBolded = useRef<boolean>(false);

  const fieldFocusAnimations = useRef<OutlinedFieldAnimation>();
  const fieldBlurAnimations = useRef<OutlinedFieldAnimation>();

  const setAnimations = () => {
    const labelRef = fieldRef.current?.labelRef();
    if (!labelRef || !legendRef.current) {
      console.warn('labelRef or legendRef are undefined!')
      return
    }

    const labelTop = labelRef.offsetTop
    const labelLeft = labelRef.offsetLeft
    const legendWidth = legendRef.current.getBoundingClientRect().width

    fieldFocusAnimations.current = {
      label: [
        {
          insetBlockStart: [`${labelTop}px`, `calc(-0.5rem - 1px)`],
          insetInlineStart: [`${labelLeft}px`, '16px'],
          fontSize: ['var(--_label-text-size)', 'var(--_label-text-populated-size)'],
          lineHeight: ['var(--_label-text-line-height)', 'var(--_label-text-populated-line-height)'],
          paddingInline: ['0', '2px']
        },
        {
          duration: 150, easing: EASING.STANDARD, fill: 'forwards'
        }
      ],
      legend: [
        {
          width: ['0', `${legendWidth}px`],
          paddingInline: ['0', '2px'],
          // marginLeft: ['16px', '13px']
        },
        {
          duration: 150, easing: EASING.STANDARD, fill: 'forwards'
        }
      ],
      outline: [
        {
          borderWidth: ['var(--_outline-width)', 'var(--_focus-outline-width)'],
          // insetInlineStart: ['0', '-3px']
        },
        {
          duration: 100, easing: EASING.STANDARD, fill: 'forwards'
        }
      ]
    }

    fieldBlurAnimations.current = {
      label: [
        {
          insetBlockStart: [`calc(-0.5rem - 1px)`, `${labelTop}px`],
          insetInlineStart: ['16px', `${labelLeft}px`],
          fontSize: ['var(--_label-text-populated-size)', 'var(--_label-text-size)'],
          lineHeight: ['var(--_label-text-populated-line-height)', 'var(--_label-text-line-height)'],
          paddingInline: ['2px', '0']
        },
        {
          duration: 150, easing: EASING.STANDARD, fill: 'forwards'
        }
      ],
      legend: [
        {
          width: [`${legendWidth}px`, '0'],
          paddingInline: ['2px', '0'],
        },
        {
          duration: 150, easing: EASING.STANDARD, fill: 'forwards'
        }
      ],
      outline: [
        {
          borderWidth: ['var(--_focus-outline-width)', 'var(--_outline-width)'],
        },
        {
          duration: 100, easing: EASING.STANDARD, fill: 'forwards'
        }
      ]
    }

    setCalculating(false)
  }

  const animateFocus = () => {
    const labelRef = fieldRef.current?.labelRef();
    if (!fieldFocusAnimations.current || !labelRef) {
      console.warn('fieldFocusAnimations is undefined!')
      return
    }

    const elementAndAnimations: ElementAndAnimations = []

    if (!labelPopulated.current) {
      elementAndAnimations.push([
        labelRef,
        fieldFocusAnimations.current.label,
        true
      ])
      labelPopulated.current = true
    }

    if (!legendMounted.current) {
      elementAndAnimations.push([
        legendRef.current!,
        fieldFocusAnimations.current.legend,
        true
      ])
      legendMounted.current = true
    }

    if (!outlineBolded.current) {
      elementAndAnimations.push([
        outlineRef.current!,
        fieldFocusAnimations.current.outline,
        true
      ])
      outlineBolded.current = true
    }

    void executeAnimation(elementAndAnimations)
  }

  const animateBlur = () => {
    const labelRef = fieldRef.current?.labelRef();
    if (!fieldBlurAnimations.current || !labelRef) {
      console.warn('fieldBlurAnimations is undefined!')
      return
    }

    const elementAndAnimations: ElementAndAnimations = []

    if (labelPopulated.current && !value) {
      elementAndAnimations.push([
        labelRef,
        fieldBlurAnimations.current.label,
        true
      ])
      labelPopulated.current = false
    }

    if (legendMounted.current && !value) {
      elementAndAnimations.push([
        legendRef.current!,
        fieldBlurAnimations.current.legend,
        true
      ])
      legendMounted.current = false
    }

    if (outlineBolded.current) {
      elementAndAnimations.push([
        outlineRef.current!,
        fieldBlurAnimations.current.outline,
        true
      ])
      outlineBolded.current = false
    }

    executeAnimation(elementAndAnimations).then(() => {
      setPopulated(false)
    })
  }

  const mouseDownHandler = (e: ReactMouseEvent) => {
    if (disabled) {
      return
    }
    e.preventDefault()
    setPopulated(true)
    setFocus(true)
  };

  const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    setValue(e.target.value)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
      setFocus(false)
      setInputFocus(false)
    }
  };

  const rootClickHandler = (e: ReactMouseEvent) => {
    e.preventDefault()
    setInputFocus(true)
  }

  useEffect(() => {
    if (rootRef.current && fieldRef.current) {
      setAnimations()
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [rootRef, fieldRef])

  useEffect(() => {
    if (focus && populated) {
      animateFocus()
    } else {
      animateBlur()
    }
  }, [focus, populated]);


  return (
    <div
      ref={rootRef}
      className={c('nd-outlined-field', {
        'populated': populated || value,
        'focus': focus,
        'error': error,
        'disabled': disabled,
        'with-supporting-text': supportingText
      })}
      onMouseDown={mouseDownHandler}
      onClick={rootClickHandler}
    >
      <fieldset ref={outlineRef} className={'nd-outlined-field__outline'}>
        <legend
          ref={legendRef}
          className={c('nd-field__label-reflection', {'calculating': calculating})}
        >
          {label}
        </legend>
      </fieldset>
      <Field ref={fieldRef} onChange={valueChangeHandler} focus={inputFocus} disabled={disabled} label={label} {...rest}></Field>
      {supportingText && <SupportingText>{supportingText}</SupportingText>}
    </div>
  )
}
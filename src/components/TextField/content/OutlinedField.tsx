import React, {ReactNode, useEffect, useRef, useState, MouseEvent as ReactMouseEvent, ChangeEvent} from 'react'
import Field, {FieldProps} from "./Field";
import c from 'classnames'
import SupportingText from "./SupportingText";
import {EASING} from "../../internal/motion/animation";

export type AnimationArgs = Parameters<Element['animate']>
export type ElementAndAnimations = [HTMLElement, AnimationArgs][]

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
  const labelRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLFieldSetElement>(null);
  const labelPopulated = useRef<boolean>(false);
  const legendMounted = useRef<boolean>(false);
  const outlineBolded = useRef<boolean>(false);

  const fieldFocusAnimations = useRef<OutlinedFieldAnimation>();
  const fieldBlurAnimations = useRef<OutlinedFieldAnimation>();

  const setAnimations = () => {
    if (!labelRef.current || !legendRef.current) {
      console.warn('labelRef or legendRef are undefined!')
      return
    }

    const labelTop = labelRef.current.offsetTop
    const labelLeft = labelRef.current.offsetLeft
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
    if (!fieldFocusAnimations.current) {
      console.warn('fieldFocusAnimations is undefined!')
      return
    }

    const elementAndAnimations: ElementAndAnimations = []

    if (!labelPopulated.current) {
      elementAndAnimations.push([
        labelRef.current!,
        fieldFocusAnimations.current.label
      ])
      labelPopulated.current = true
    }

    if (!legendMounted.current) {
      elementAndAnimations.push([
        legendRef.current!,
        fieldFocusAnimations.current.legend
      ])
      legendMounted.current = true
    }

    if (!outlineBolded.current) {
      elementAndAnimations.push([
        outlineRef.current!,
        fieldFocusAnimations.current.outline
      ])
      outlineBolded.current = true
    }

    void executeAnimation(elementAndAnimations)
  }

  const animateBlur = () => {
    if (!fieldBlurAnimations.current) {
      console.warn('fieldBlurAnimations is undefined!')
      return
    }

    const elementAndAnimations: ElementAndAnimations = []

    if (labelPopulated.current && !value) {
      elementAndAnimations.push([
        labelRef.current!,
        fieldBlurAnimations.current.label
      ])
      labelPopulated.current = false
    }

    if (legendMounted.current && !value) {
      elementAndAnimations.push([
        legendRef.current!,
        fieldBlurAnimations.current.legend
      ])
      legendMounted.current = false
    }

    if (outlineBolded.current) {
      elementAndAnimations.push([
        outlineRef.current!,
        fieldBlurAnimations.current.outline
      ])
      outlineBolded.current = false
    }

    executeAnimation(elementAndAnimations).then(() => {
      setPopulated(false)
    })
  }

  const executeAnimation = async (elementAndAnimations: ElementAndAnimations) => {
    const animations: Animation[] = []
    for (const [element, animationArgs] of elementAndAnimations) {
      const animate = element.animate(animationArgs[0], animationArgs[1])
      animations.push(animate)
    }
    await Promise.all(animations.map((animation) => animation.finished))
    animations.forEach(a => {
      a.commitStyles()
      a.cancel()
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
    setAnimations()
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [rootRef, labelRef])

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
      <Field onChange={valueChangeHandler} focus={inputFocus} disabled={disabled} {...rest}>
        <span ref={labelRef} className={'nd-field__label'}>{label}</span>
      </Field>
      {supportingText && <SupportingText>{supportingText}</SupportingText>}
    </div>
  )
}
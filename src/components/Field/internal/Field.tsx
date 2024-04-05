import React, {forwardRef, HTMLProps, ReactNode, useEffect, useRef, useState} from 'react'
import Container, {ContainerProps} from "../../Container/Container";
import './Field.scss'
import c from 'classnames'
import {EASING} from "../../internal/motion/animation";
import SupportingText from "./SupportingText";

export interface FieldProps extends HTMLProps<HTMLDivElement>{
  children?: ReactNode
  label?: string
  populated?: boolean
  supportingText?: string
  supportingTextTrailing?: string
  focus?: boolean
  disabled?: boolean,
  error?: boolean
}

const Field = forwardRef<HTMLDivElement, FieldProps>((props, ref) => {
  const {
    children,
    label,
    populated,
    className,
    supportingTextTrailing,
    supportingText,
    ...rest
  } = props

  const floatingLabel = useRef<HTMLSpanElement>(null);
  const restingLabel = useRef<HTMLSpanElement>(null);
  const labelAnimation = useRef<Animation | null>(null);
  const [floatingLabelShow, setFloatingLabelShow] = useState<boolean>(Boolean(populated))

  const getLabelKeyframes = () => {
    if (!floatingLabel.current || !restingLabel.current) {
      return [];
    }
    const {x: floatingX, y: floatingY, height: floatingHeight,} = floatingLabel.current.getBoundingClientRect();
    const {x: restingX, y: restingY, height: restingHeight,} = restingLabel.current.getBoundingClientRect();
    const floatingScrollWidth = floatingLabel.current.scrollWidth;
    const restingScrollWidth = restingLabel.current.scrollWidth;
    // Scale by width ratio instead of font size since letter-spacing will scale
    // incorrectly. Using the width we can better approximate the adjusted
    // scale and compensate for tracking and overflow.
    // (use scrollWidth instead of width to account for clipped labels)
    const scale = restingScrollWidth / floatingScrollWidth;
    const xDelta = restingX - floatingX;
    // The line-height of the resting and floating label are different. When
    // we move the floating label down to the resting label's position, it won't
    // exactly match because of this. We need to adjust by half of what the
    // final scaled floating label's height will be.
    const yDelta = restingY -
      floatingY +
      Math.round((restingHeight - floatingHeight * scale) / 2);
    // Create the two transforms: floating to resting (using the calculations
    // above), and resting to floating (re-setting the transform to initial
    // values).
    const restTransform = `translateX(${xDelta}px) translateY(${yDelta}px) scale(${scale})`;
    const floatTransform = `translateX(0) translateY(0) scale(1)`;
    // Constrain the floating labels width to a scaled percentage of the
    // resting label's width. This will prevent long clipped labels from
    // overflowing the container.
    const restingClientWidth = restingLabel.current.clientWidth;
    const isRestingClipped = restingScrollWidth > restingClientWidth;
    const width = isRestingClipped ? `${restingClientWidth / scale}px` : '';
    if (populated) {
      return [
        {transform: restTransform, width},
        {transform: floatTransform, width},
      ];
    }
    return [
      {transform: floatTransform, width},
      {transform: restTransform, width},
    ];
  }

  function animateFloating() {
    if (!floatingLabel.current) {
      return
    }

    labelAnimation.current = floatingLabel.current.animate(getLabelKeyframes(), {
      duration: 150,
      easing: EASING.STANDARD,
      fill: 'forwards'
    })
    labelAnimation.current.addEventListener('finish', () => {
      if (!populated) {
        setFloatingLabelShow(false)
      } else {
        labelAnimation.current?.cancel()
      }
    })
  }

  useEffect(() => {
    labelAnimation.current?.cancel()
    if (populated) {
      setFloatingLabelShow(true)
    } else {
      animateFloating();
    }
  }, [populated]);

  useEffect(() => {
    if (floatingLabelShow) {
      animateFloating();
    } else {
      labelAnimation.current?.cancel()
    }
  }, [floatingLabelShow]);

  return (
    <div ref={ref} className={c('nd-field', className, {'populated': populated})}>
      <Container
        middle={label &&
          <div className={'nd-field__label-wrapper'}>
          <span
            ref={restingLabel}
            className={c('nd-field__label-wrapper__label resting', {'hidden': floatingLabelShow})}
          >
            {label}
          </span>
            <span
              ref={floatingLabel}
              className={c('nd-field__label-wrapper__label floating', {'hidden': !floatingLabelShow})}
            >
            {label}
          </span>
          </div>
        }
        {...rest}
      >
        {children}
      </Container>
      <SupportingText trailing={supportingTextTrailing} content={supportingText}></SupportingText>
    </div>
  )
})

export default Field
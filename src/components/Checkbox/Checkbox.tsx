import React, {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from 'react'
import CheckboxContent, {CheckboxContentProps, setState as _setState} from "./internal/CheckboxContent";
import './Checkbox.scss'
import cln from "classnames";
import useRipple from "../Ripple/useRipple";
import useFocusRing from "../Focus/useFocusRing";

export interface CheckboxProps extends CheckboxContentProps {
  children?: ReactNode
}

export interface CheckboxHandle {
  checkbox?: HTMLInputElement | null
}

const Checkbox = forwardRef<CheckboxHandle, CheckboxProps>((props: CheckboxProps, ref) => {
  const {
    children,
    checked: _chk = false,
    indeterminate: _indeterm = false,
    disabled,
    error,
    onBlur,
    onFocus,
    ...rest
  } = props

  const [state, setState] = useState<number>(_indeterm ? 2 : _chk ? 1 : 0)
  const checkbox = useRef<HTMLInputElement>(null);
  const [parent, setParent] = useState<HTMLInputElement>()

  const [rippleProps, ripple] = useRipple<HTMLDivElement>({})
  const [focusRingProps, focusRing] = useFocusRing<HTMLInputElement>({parent, onFocus, onBlur})

  useEffect(() => {
    if (checkbox.current) {
      setParent(checkbox.current)
    }
  }, [checkbox]);

  useImperativeHandle(ref, () => ({
    checkbox: checkbox.current
  }))

  const clickHandler = () => {
    if (state === 2) {
      setState(1)
    } else if (state === 1) {
      setState(0)
    } else {
      setState(1)
    }
  }

  useEffect(() => {
    setState(_setState(_chk, _indeterm))
  }, [_chk, _indeterm]);

  return (
    <div
      className={cln('nd-checkbox', {
        'nd-disabled': disabled,
        'nd-selected': state !== 0,
        'nd-error': error
      })}
      onClick={clickHandler}
      {...rippleProps}
    >
      {ripple}
      {focusRing}
      <CheckboxContent
        ref={checkbox}
        disabled={disabled}
        checked={state === 1}
        indeterminate={state === 2}
        {...focusRingProps}
        {...rest}
      ></CheckboxContent>
    </div>
  )
})

export default Checkbox
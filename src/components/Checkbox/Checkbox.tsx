import React, {forwardRef, ReactNode, useEffect, useState} from 'react'
import CheckboxContent, {CheckboxContentProps, setState as _setState} from "./internal/CheckboxContent";
import './Checkbox.scss'
import StateLayer from "../StateLayer";
import FocusRing from "../Focus/FocusRing";
import cln from "classnames";
import {StateElement} from "../internal/common/StateElement";

export interface CheckboxProps extends CheckboxContentProps, StateElement {
  children?: ReactNode
}

const Checkbox = StateLayer<HTMLDivElement, CheckboxProps>(forwardRef<HTMLDivElement, CheckboxProps>((props: CheckboxProps, ref) => {
  const {
    children,
    checked: _chk = false,
    indeterminate: _indeterm = false,
    disabled,
    error,
    stateLayer,
    ...rest
  } = props

  const [state, setState] = useState<number>(_indeterm ? 2 : _chk ? 1 : 0)

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
    >
      <FocusRing></FocusRing>
      {!disabled && stateLayer}
      <CheckboxContent disabled={disabled} checked={state === 1} indeterminate={state === 2} {...rest}></CheckboxContent>
    </div>
  )
}))

export default Checkbox
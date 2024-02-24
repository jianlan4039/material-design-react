import React, {forwardRef, ReactNode, useEffect, useState} from 'react'
import CheckboxContent, {CheckboxContentProps, setState as _setState} from "./content/CheckboxContent";
import './Checkbox.scss'
import StateLayer from "../StateLayer";
import FocusRing from "../Focus/FocusRing";
import cln from "classnames";
import {Simulate} from "react-dom/test-utils";

export interface CheckboxProps extends CheckboxContentProps {
  children?: ReactNode
}

const Checkbox = forwardRef((props: CheckboxProps, ref) => {
  const {
    children,
    check: _chk = false,
    indeterminate: _indeterm = false,
    disabled,
    error,
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
      <StateLayer disabled={disabled}></StateLayer>
      <FocusRing></FocusRing>
      <CheckboxContent disabled={disabled} check={state === 1} indeterminate={state === 2} {...rest}></CheckboxContent>
    </div>
  )
})

export default Checkbox
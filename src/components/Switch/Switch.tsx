import React, {ChangeEvent, forwardRef, HTMLAttributes, ReactNode, useEffect, useRef, useState} from 'react'
import {StateElement} from "../internal/common/StateElement";
import withStateLayer from "../StateLayer";
import Outline from "../Outline/Outline";
import c from 'classnames'
import './Switch.scss'

export interface SwitchProps extends StateElement, HTMLAttributes<HTMLInputElement> {
  children?: ReactNode
  checked?: boolean
  icon?: ReactNode
  uncheckedIcon?: ReactNode
  disabled?: boolean
}

const Switch = withStateLayer<HTMLElement, SwitchProps>(forwardRef<HTMLDivElement, SwitchProps>((props, ref) => {
  const {
    children,
    stateLayer,
    onMouseOver,
    onMouseOut,
    onMouseDown,
    onMouseUp,
    id,
    checked: _checked,
    icon,
    uncheckedIcon,
    disabled,

  } = props

  const [checked, setChecked] = useState<boolean>(Boolean(_checked))
  const handleRef = useRef<HTMLDivElement>(null);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(Boolean(e.target.checked))
  }

  useEffect(() => {
    setChecked(Boolean(_checked))
  }, [_checked]);

  return (
    <div
      ref={ref}
      className={c('switch', {
        'switch--checked': checked,
        'switch--unchecked': !checked,
        'switch--disabled': disabled
      })}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <Outline></Outline>
      <input
        id={id}
        className={'switch__checkbox'}
        checked={checked}
        disabled={disabled}
        type="checkbox"
        onChange={changeHandler}
      />
      <div className={'switch__handle-container'}>
        {!disabled && <div className={'switch__handle__state'}>{stateLayer}</div>}
        <span
          ref={handleRef}
          className={c('switch__handle', {
            'with-selected-icon': icon,
            'with-unchecked-icon': uncheckedIcon
          })}
        >
          {checked ? icon : uncheckedIcon}
        </span>
      </div>
    </div>
  )
}))

export default Switch;
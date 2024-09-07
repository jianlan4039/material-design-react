import React, {
  ChangeEvent,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import Outline from "../Outline/Outline";
import c from 'classnames'
import './Switch.scss'
import useRipple from "../Ripple/useRipple";
import useFocusRing from "../Focus/useFocusRing";

export interface SwitchProps extends HTMLAttributes<HTMLInputElement> {
  children?: ReactNode
  checked?: boolean
  icon?: ReactNode
  uncheckedIcon?: ReactNode
  disabled?: boolean
}

export interface SwitchHandle {
  switcher?: HTMLInputElement | null
}

const Switch = forwardRef<SwitchHandle, SwitchProps>((props, ref) => {
  const {
    children,
    onMouseOver,
    onMouseOut,
    onMouseDown,
    onMouseUp,
    id,
    checked: _checked,
    icon,
    uncheckedIcon,
    disabled,
    onBlur,
    onFocus,
    ...rest
  } = props

  const [checked, setChecked] = useState<boolean>(Boolean(_checked))
  const handleRef = useRef<HTMLDivElement>(null);

  const switcher = useRef<HTMLInputElement>(null);
  const [parent, setParent] = useState<HTMLInputElement>()

  const [rippleProps, ripple] = useRipple<HTMLDivElement>({})
  const [focusRingProps, focusRing] = useFocusRing<HTMLInputElement>({parent, onFocus, onBlur})

  useEffect(() => {
    if (switcher.current) {
      setParent(switcher.current)
    }
  }, [switcher]);

  useImperativeHandle(ref, () => ({
    switcher: switcher.current
  }))

  useEffect(() => {
    setChecked(Boolean(_checked))
  }, [_checked]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    setChecked(Boolean(e.target.checked))
  }

  return (
    <div
      className={c('nd-switch', {
        'switch--checked': checked,
        'switch--unchecked': !checked,
        'switch--disabled': disabled
      })}
      {...rippleProps}
    >
      <Outline></Outline>
      {focusRing}
      <input
        ref={switcher}
        id={id}
        className={'switch__checkbox'}
        checked={checked}
        aria-disabled={disabled}
        type="checkbox"
        onChange={changeHandler}
        {...focusRingProps}
        {...rest}
      />
      <div className={'switch__handle-container'}>
        {!disabled && <div className={'switch__handle__state'}>
          {ripple}
        </div>}
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
})

export default Switch;
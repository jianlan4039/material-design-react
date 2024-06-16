import React, {forwardRef, HTMLAttributes, ReactNode, useEffect, useRef, useState} from 'react'
import Elevation from "../Elevation";
import c from 'classnames'
import useRipple from "../Ripple/useRipple";
import Button from "./content/Button";
import useFocusRing from "../Focus/useFocusRing";

export interface WrapperProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
  disabled?: boolean
  icon?: ReactNode
  selectedIcon?: ReactNode
}

const Wrapper = forwardRef<HTMLButtonElement, WrapperProps>((props, ref) => {
  const {
    children,
    disabled,
    toggled,
    selected: _selected,
    className,
    icon,
    selectedIcon,
    onFocus,
    onBlur,
    ...rest
  } = props

  const [selected, setSelected] = useState<boolean>(Boolean(_selected))
  const button = useRef<HTMLButtonElement>(null);
  const [parent, setParent] = useState<HTMLButtonElement>()

  const [focusRingProps, focusRing] = useFocusRing<HTMLButtonElement>({parent, onFocus, onBlur})
  const [rippleProps, ripple] = useRipple<HTMLDivElement>({})

  useEffect(() => {
    if (button.current) {
      setParent(button.current)
    }
  }, [button]);

  useEffect(() => {
    setSelected(Boolean(_selected))
  }, [_selected]);

  const clickHandler = () => {
    if (disabled) return;
    if (toggled) {
      setSelected(!selected)
    }
  };

  return (
    <div
      className={c(className, {
        'disabled': disabled,
        'toggled': toggled,
        'selected': toggled && selected
      })}
      {...rippleProps}
    >
      <Elevation></Elevation>
      {!disabled && ripple}
      {focusRing}
      {children}
      <Button ref={button} disabled={disabled} onClick={clickHandler} {...focusRingProps} {...rest}>
        {toggled ? selected ? selectedIcon ?? icon : icon : icon}
      </Button>
    </div>
  )
})

export default Wrapper
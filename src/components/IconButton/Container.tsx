import React, {
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
  MouseEvent,
  useImperativeHandle
} from 'react'
import c from 'classnames'
import Button from "./internal/Button";
import StatefulBox from "../StatefulBox/StatefulBox";

export interface WrapperProps extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
  disabled?: boolean
  icon?: ReactNode
  selectedIcon?: ReactNode
}

export interface WrapperHandle {
  wrapper?: HTMLDivElement | null
  button?: HTMLButtonElement | null
}

const Container = forwardRef<WrapperHandle, WrapperProps>((props, ref) => {
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
    onClick,
    ...rest
  } = props

  const [selected, setSelected] = useState<boolean>(Boolean(_selected))
  const button = useRef<HTMLButtonElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(Boolean(_selected))
  }, [_selected]);

  useImperativeHandle(ref, () => ({
    button: button.current,
    wrapper: wrapper.current
  }))

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(e)
    if (toggled) {
      setSelected(!selected)
    }
  };

  return (
    <StatefulBox
      className={c(className, {
        'disabled': disabled,
        'toggled': toggled,
        'selected': toggled && selected
      })}
      disabled={disabled}
    >
      {children}
      <Button ref={button} disabled={disabled} onClick={clickHandler} {...rest}>
        {toggled ? selected ? selectedIcon ?? icon : icon : icon}
      </Button>
    </StatefulBox>
  )
})

export default Container;
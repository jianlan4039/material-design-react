import React, {forwardRef, ReactNode, useImperativeHandle, useRef} from 'react'
import './FAB.scss'
import Button, {ButtonProps} from "./internal/Button";
import cln from "classnames";
import StatefulBox from "../StatefulBox/StatefulBox";

export interface FABProps extends ButtonProps {
  children?: ReactNode
  size?: 'small' | "large" | "default"
  variant?: 'normal' | 'primary' | 'secondary' | 'tertiary'
  lowered?: boolean
}

export interface FABHandle {
  button?: HTMLButtonElement | null
}

const FAB = forwardRef<FABHandle, FABProps>((props, ref) => {
  const {
    children,
    size,
    variant,
    lowered,
    onBlur,
    onFocus,
    ...rest
  } = props

  const buttonRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => ({
    button: buttonRef.current
  }))

  return (
    <StatefulBox
      className={cln('nd-fab', {
        [`${size}`]: size,
        [`nd-fab--${variant}`]: variant,
        'lowered': lowered
      })}
    >
      <Button ref={buttonRef} {...rest}>
        {children}
      </Button>
    </StatefulBox>
  )
})

export default FAB
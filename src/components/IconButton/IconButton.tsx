import React, {forwardRef, ReactNode, MouseEvent} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './IconButton.scss'
import c from 'classnames'
import IconButtonContainer from "./IconButtonContainer";
import withFocusRing from "../Focus";

export interface IconButtonProps extends ButtonProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

const IconButton = withFocusRing(forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const {
    children,
    disabled,
    toggled,
    selected,
    className,
    onMouseOver,
    onMouseOut,
    onMouseDown,
    onMouseUp,
    focusRing,
    ...rest
  } = props

  const mouseOutHandler = (e: MouseEvent<HTMLDivElement>) => {
    onMouseOut?.(e as unknown as MouseEvent<HTMLButtonElement>)
  };

  const mouseOverHandler = (e: MouseEvent) => {
    onMouseOver?.(e as unknown as MouseEvent<HTMLButtonElement>)
  };

  const mouseDownHandler = (e: MouseEvent) => {
    onMouseDown?.(e as unknown as MouseEvent<HTMLButtonElement>)
  };

  const mouseUpHandler = (e: MouseEvent) => {
    onMouseUp?.(e as unknown as MouseEvent<HTMLButtonElement>)
  };

  return (
    <IconButtonContainer
      className={c('nd-icon-button', className, {
        'disabled': disabled
      })}
      toggled={toggled}
      selected={selected}
      disabled={disabled}
      onMouseUp={mouseUpHandler}
      onMouseDown={mouseDownHandler}
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
      focusRing={focusRing}
    >
      <Button ref={ref} disabled={disabled} {...rest}>
        {children}
      </Button>
    </IconButtonContainer>
  )
}))

export default IconButton
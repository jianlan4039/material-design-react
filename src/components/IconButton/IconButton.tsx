import React, {forwardRef, ReactNode, MouseEvent} from 'react'
import Button, {ButtonProps} from "./content/Button";
import './IconButton.scss'
import c from 'classnames'
import IconButtonContainer from "./IconButtonContainer";

export interface IconButtonProps extends ButtonProps {
  children?: ReactNode
  toggled?: boolean
  selected?: boolean
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
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
      className={c('nd-icon-button', className)}
      toggled={toggled}
      selected={selected}
      onMouseUp={mouseUpHandler}
      onMouseDown={mouseDownHandler}
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
    >
      <Button ref={ref} {...rest}>
        {children}
      </Button>
    </IconButtonContainer>
  )
})

export default IconButton
import React, {forwardRef, HTMLAttributes, ReactNode, MouseEvent} from 'react'
import './Navigator.scss';
import c from 'classnames'
import IconButton from "../../IconButton/IconButton";
import {MenuItemProps} from "../../Menu/MenuItem";

export interface NavigatorProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  label?: string
  items?: MenuItemProps[]
  open?: boolean
  onLast?: () => void
  onNext?: () => void
  disabled?: boolean
}

const Navigator = forwardRef<HTMLDivElement, NavigatorProps>((props, ref) => {
  const {
    children,
    items,
    label,
    onClick,
    open,
    onLast,
    onNext,
    disabled,
    ...rest
  } = props

  function clickHandler(e: MouseEvent<HTMLDivElement>) {
    if (disabled) {
      return
    }
    onClick?.(e)
  }

  return (
    <div ref={ref} className={c('navigator', {'disabled': disabled})}>
      <IconButton onClick={onLast} disabled={disabled}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
        </svg>
      </IconButton>
      <div className={'headline'} onClick={clickHandler}>
        <span className={'headline-label'}>{label}</span>
        <span className={'headline-menu-icon'}>
          {
            open ?
              <svg xmlns="http://www.w3.org/2000/svg" height='18' viewBox="0 -960 960 960" width="18">
                <path d="m280-400 200-200 200 200H280Z"/>
              </svg> :
              <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18">
                <path d="M480-360 280-560h400L480-360Z"/>
              </svg>
          }
        </span>
      </div>
      <IconButton onClick={onNext} disabled={disabled}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
        </svg>
      </IconButton>
    </div>
  )
})

export default Navigator;
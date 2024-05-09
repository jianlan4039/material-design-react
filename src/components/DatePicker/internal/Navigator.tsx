import React, {forwardRef, HTMLAttributes, ReactNode, useEffect, useRef, useState} from 'react'
import IconButton from "../../IconButton/IconButton";
import './Navigator.scss'
import Menu from "../../Menu/Menu";
import {MenuItemProps} from "../../Menu/MenuItem";
import {OptionValue} from "../../Menu/internal/menuTypes";
import TextButton from "../../Button/TextButton";

export interface NavigatorProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  label?: string
  items?: MenuItemProps[]
  open?: boolean
  onLast?: () => void
  onNext?: () => void
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
    ...rest
  } = props

  return (
    <div ref={ref} className={'navigator'}>
      <IconButton onClick={onLast}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
        </svg>
      </IconButton>
      <div className={'headline'} onClick={onClick}>
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
      <IconButton onClick={onNext}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
        </svg>
      </IconButton>
    </div>
  )
})

export default Navigator;
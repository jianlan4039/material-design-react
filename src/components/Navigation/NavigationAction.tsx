import React, {ReactNode, useContext, useState} from "react";
import Badge from "../Badge/Badge";
import useRipple from "../Ripple/useRipple";
import c from 'classnames'
import {SelectionContext} from './context'
import './NavigationAction.scss';

export interface NavigationActionProps {
  id: string,
  icon?: ReactNode
  activeIcon?: ReactNode
  label?: string
  badgeSize?: 'small' | 'large'
  badgeCount?: number
}

export default function NavigationAction(props: NavigationActionProps) {
  const {icon, activeIcon, badgeSize, badgeCount, label, id} = props
  const {list, setList} = useContext(SelectionContext)
  const [rippleProps, ripple] = useRipple({})
  const isActive = list?.includes(id)

  return (
    <div
      className={c('md-navigation-action', {
        "md-navigation-action--active": isActive,
      })}
      onClick={() => setList?.([id])}
      {...rippleProps}
    >
      <div className={'md-navigation-action__indicator'}>
        {ripple}
      </div>
      <Badge size={badgeSize} count={badgeCount}>
        <span className={'md-navigation-action__icon'}>{isActive ? activeIcon || icon : icon}</span>
      </Badge>
      <span className={'md-navigation-action__label'}>{label}</span>
    </div>
  )
}
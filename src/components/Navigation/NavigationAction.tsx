import React, {ReactNode, MouseEvent, useState} from "react";
import Badge from "../Badge/Badge";
import useRipple from "../Ripple/useRipple";
import c from 'classnames'
import './NavigationAction.scss';

export interface NavigationActionProps {
  id: string,
  icon?: ReactNode
  activeIcon?: ReactNode
  label?: string
  badgeSize?: 'small' | 'large'
  badgeCount?: number
  active?: boolean
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

export default function NavigationAction(props: NavigationActionProps) {
  const {icon, activeIcon, badgeSize, badgeCount, label, id, active, ...rest} = props
  const [rippleProps, ripple] = useRipple({})

  return (
    <div
      id={id}
      className={c('nd-navigation-action', {
        "nd-navigation-action--active": active,
      })}
      {...rest}
      {...rippleProps}
    >
      <div className={'nd-navigation-action__indicator'}>
        {ripple}
      </div>
      <Badge size={badgeSize} count={badgeCount}>
        <span className={'nd-navigation-action__icon'}>{active ? activeIcon || icon : icon}</span>
      </Badge>
      <span className={'nd-navigation-action__label'}>{label}</span>
    </div>
  )
}
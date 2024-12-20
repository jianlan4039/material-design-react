import React, {ReactNode, useMemo, useState} from 'react';
import './NavigationBar.scss';
import Elevation from "../Elevation";
import {SelectionContextProvider} from './context'
import NavigationAction, {NavigationActionProps} from "./NavigationAction";

export interface NavigationBarProps {
  children: ReactNode
  preset?: number
  items?: NavigationActionProps[]
}

export default function NavigationBar(props: NavigationBarProps) {
  const {children, items} = props

  const [activatedAction, setActivatedAction] = useState<string>('')

  const Actions = useMemo(() => {
    return items?.map((it, index) => (
      <NavigationAction
        key={`${it.id}-${index}`}
        id={it.id}
        icon={it.icon}
        label={it.label}
        activeIcon={it.activeIcon}
        active={activatedAction === it.id}
        onClick={() => setActivatedAction(it.id)}
      />
    ))
  }, [items, activatedAction])

  return (
    <div className={'nd-navigation-bar'}>
      <Elevation></Elevation>
      {children || Actions}
    </div>
  )
}
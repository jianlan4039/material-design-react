import React, {ReactNode, useMemo, useState} from 'react';
import c from 'classnames';
import './NavigationRail.scss'
import NavigationAction, {NavigationActionProps} from "./NavigationAction";

export interface NavigationRailProps {
  children?: ReactNode
  items?: NavigationActionProps[]
  alignment?: 'start' | 'center' | 'end'
}

export default function NavigationRail(props: NavigationRailProps) {
  const {children, items, alignment = "center"} = props
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
    <div className={c('nd-navigation-rail', alignment)}>
      <div className={'nd-navigation-rail__actions'}>
        {children || Actions}
      </div>
    </div>
  )
}
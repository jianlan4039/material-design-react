import React, {ReactNode, useEffect, useMemo, useRef} from "react"
import c from "classnames"
import './NavigationDrawer.scss'
import Elevation from "../Elevation";

export interface NavigationDrawerProps {
  modal?: boolean
  show?: boolean
  children?: ReactNode
}

export function NavigationDrawer(props: NavigationDrawerProps) {
  const {modal, show, children} = props;
  const ref = useRef<HTMLDivElement>(null);
  const containerRect = useRef<DOMRect>();

  useEffect(() => {
    if (ref.current) {
      containerRect.current = ref.current.getBoundingClientRect()
    }
  }, [ref.current]);

  return (
    <div
      ref={ref}
      className={c('nd-navigation-drawer', {
        'nd-navigation-drawer--modal-closed': modal && !show,
        'nd-navigation-drawer--modal-open': modal && show,
      })}
    >
      <Elevation></Elevation>
      {children}
    </div>
  )
}
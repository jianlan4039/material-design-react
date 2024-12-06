import React, {ReactNode} from "react"
import c from "classnames"
import Elevation from "../Elevation"
import './NavigationDrawer.scss'

export interface NavigationDrawerProps {
  modal?: boolean
  show?: boolean
  children?: ReactNode
}

/**
 * 这是一个从屏幕边沿打开的drawer，它可以处于屏幕的顶部、右侧、底部和左侧。它存在两种模式，标准模式和模态模式，标准模式下它是一个固定的容器，
 * 处于屏幕的边沿；模态模式下，它是一个模态框，可以打开和收起。
 *
 * @param props
 * @constructor
 */
export function NavigationDrawer(props: NavigationDrawerProps) {
  const {modal, show, children} = props;

  return (
    <div
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
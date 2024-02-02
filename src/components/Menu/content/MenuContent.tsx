import React, {ReactNode, memo, forwardRef, HTMLAttributes} from 'react'
import cln from "classnames";
import './MenuContent.scss'

export interface MenuContentProps extends HTMLAttributes<HTMLUListElement> {
  children?: ReactNode
}

const MenuContent = memo(forwardRef<HTMLUListElement, MenuContentProps>((props, ref) => {
  const {
    children,
    className,
    ...rest
  } = props

  return <ul ref={ref} className={cln('nd-menu-content', className)} {...rest}>
    {children}
  </ul>
}))

export default MenuContent
import React, {ReactNode, memo, forwardRef, HTMLAttributes} from 'react'
import cln from "classnames";
import './MenuContent.scss'

export interface MenuContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const MenuContent = memo(forwardRef<HTMLDivElement, MenuContentProps>((props, ref) => {
  const {
    children,
    className,
    ...rest
  } = props

  return <div ref={ref} className={cln('nd-menu-content', className)} {...rest}>
    {children}
  </div>
}))

export default MenuContent
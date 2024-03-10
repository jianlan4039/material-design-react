import React, {ReactNode, memo, HTMLAttributes} from 'react'
import './MenuItemContent.scss'
import c from 'classnames'

export interface MenuItemContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  start?: ReactNode
  end?: ReactNode
}

const MenuItemContent = memo((props: MenuItemContentProps) => {
  const {
    children,
    start,
    end,
    className,
    ...rest
  } = props

  return <>
    <div className={c('nd-menu-item-content', className)} {...rest}>
      {start && <div className={'nd-menu-item-content__start'}>{start}</div>}
      <div className={'nd-menu-item-content__center'}>{children}</div>
      {end && <div className={'nd-menu-item-content__end'}>{end}</div>}
    </div>
  </>
})

export default MenuItemContent
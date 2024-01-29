import React, {ReactNode, memo} from 'react'
import './MenuItemContent.scss'

export interface MenuItemContentProps {
  children?: ReactNode
  start?: ReactNode
  end?: ReactNode
}

const MenuItemContent = memo((props: MenuItemContentProps) => {
  const {
    children,
    start,
    end,
    ...rest
  } = props

  return <>
    <div className={'nd-menu-item'}>
      {start && <div className={'nd-menu-item__start'}>{start}</div>}
      <div className={'nd-menu-item__center'}>{children}</div>
      {end && <div className={'nd-menu-item__end'}>{end}</div>}
    </div>
  </>
})

export default MenuItemContent
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
    <div className={'nd-menu-item-content'}>
      {start && <div className={'nd-menu-item-content__start'}>{start}</div>}
      <div className={'nd-menu-item-content__center'}>{children}</div>
      {end && <div className={'nd-menu-item-content__end'}>{end}</div>}
    </div>
  </>
})

export default MenuItemContent
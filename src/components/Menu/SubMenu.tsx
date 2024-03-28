import React, {forwardRef, ReactNode} from 'react'

export interface SubMenuProps {
  children?: ReactNode
}

const SubMenu = forwardRef<HTMLDivElement, SubMenuProps>((props, ref) => {
  const {
    children,
    ...rest
  } = props

  return (
    <div ref={ref}>
      {children}
    </div>
  )
})

export default SubMenu;
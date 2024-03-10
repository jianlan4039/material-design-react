import React, {ReactNode} from 'react'
import ListItemContent, {ListItemContentProps} from "./content/ListItemContent";
import StateLayer from "../StateLayer";
import './ListItem.scss'
import c from 'classnames'

export interface ListItemProps extends ListItemContentProps {
  children?: ReactNode
  interactive?: boolean
  disabled?: boolean
}

export default function ListItem(props: ListItemProps) {
  const {
    children,
    interactive,
    disabled,
    ...rest
  } = props

  return (
    <li
      className={c('nd-list-item-wrapper', {
        'interactive': interactive,
        'disabled': disabled
      })}
    >
      {interactive && <StateLayer></StateLayer>}
      <ListItemContent {...rest}>
        {children}
      </ListItemContent>
    </li>
  )
}
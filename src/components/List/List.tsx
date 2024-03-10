import React, {ReactNode} from 'react'
import ListContent from "./content/ListContent";
import './List.scss'

export interface ListProps {
  children?: ReactNode
}

export default function List(props: ListProps) {
  const {
    children,
    ...rest
  } = props

  return (
    <div className={'nd-list'}>
      <ListContent>
        {children}
      </ListContent>
    </div>
  )
}
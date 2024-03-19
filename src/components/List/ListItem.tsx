import React, {ReactNode, useEffect, useRef, useState} from 'react'
import LinearSectionContainer, {
  LinearSectionContainerProps
} from "../Container/LinearSectionContainer/LinearSectionContainer";
import './ListItem.scss'
import c from 'classnames'
import StateLayer from "../StateLayer";

export interface ListItemProps extends LinearSectionContainerProps {
  label?: string
  supportingText?: string
  disabled?: boolean
}

export default function ListItem(props: ListItemProps) {
  const {
    children,
    start,
    end,
    label,
    supportingText,
    disabled,
    ...rest
  } = props

  const rootRef = useRef<HTMLLIElement>(null);
  const [isTopLayout, setIsTopLayout] = useState<boolean>(false)

  useEffect(() => {
    if (rootRef.current) {
      if (rootRef.current.getBoundingClientRect().height >= 88) {
        setIsTopLayout(true)
      } else {
        setIsTopLayout(false)
      }
    }
  }, [rootRef]);

  return (
    <li
      ref={rootRef}
      className={c('list-item', {
        'two-line-height': supportingText,
        'top-layout': isTopLayout,
        'disabled': disabled
      })}
    >
      <StateLayer disabled={disabled}></StateLayer>
      <LinearSectionContainer
        start={start}
        end={end}
        {...rest}
      >
        <span className={'list-item__label'}>{label}</span>
        <div className={'list-item__spt-txt'}>{supportingText}</div>
      </LinearSectionContainer>
    </li>
  )
}
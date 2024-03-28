import React, {forwardRef, HTMLProps, useEffect, useImperativeHandle, useRef, useState} from 'react'
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
  url?: string
  interactive?: boolean
}

export interface ListItemHandle extends HTMLProps<HTMLLIElement>{
  root?: HTMLElement | null
}

const ListItem = forwardRef<ListItemHandle, ListItemProps>((props, ref) => {
  const {
    children,
    start,
    end,
    label,
    supportingText,
    disabled,
    url,
    interactive,
    ...rest
  } = props

  const rootRef = useRef<HTMLLIElement>(null);
  const [isTopLayout, setIsTopLayout] = useState<boolean>(false)

  useImperativeHandle(ref, () => ({
    root: rootRef.current
  }))

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
      {(url || interactive) && <StateLayer disabled={disabled}></StateLayer>}
      <LinearSectionContainer
        start={start}
        end={end}
        {...rest}
      >
        <div className={'list-item__label'}>{label}</div>
        {supportingText && <div className={'list-item__spt-txt'}>{supportingText}</div>}
      </LinearSectionContainer>
    </li>
  )
})

export default ListItem
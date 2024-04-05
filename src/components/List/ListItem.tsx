import React, {
  forwardRef,
  HTMLAttributes, LiHTMLAttributes,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import LinearSectionContainer from "../Container/LinearSectionContainer/LinearSectionContainer";
import './ListItem.scss'
import c from 'classnames'
import StateLayer from "../StateLayer";
import {StateElement} from "../internal/common/StateElement";

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement>, StateElement {
  label?: string
  supportingText?: string
  disabled?: boolean
  url?: string
  interactive?: boolean
  start?: ReactNode,
  end?: ReactNode
}

export interface ListItemHandle extends HTMLAttributes<HTMLLIElement> {
  root?: HTMLLIElement | null
  body?: HTMLDivElement | null
}

const ListItem = StateLayer<ListItemHandle,ListItemProps>(forwardRef<ListItemHandle, ListItemProps>((props, ref) => {
  const {
    children,
    start,
    end,
    label,
    supportingText,
    disabled,
    url,
    interactive = true,
    className,
    stateLayer,
    ...rest
  } = props

  const rootRef = useRef<HTMLLIElement>(null);
  const contentRef = useRef<HTMLDivElement>(null)
  const [isTopLayout, setIsTopLayout] = useState<boolean>(false)

  useImperativeHandle(ref, () => ({
    root: rootRef.current,
    body: contentRef.current
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
      className={c('list-item', className, {
        'two-line-height': supportingText,
        'top-layout': isTopLayout,
        'disabled': disabled
      })}
      {...rest}
    >
      {stateLayer}
      <LinearSectionContainer
        ref={contentRef}
        start={start}
        end={end}
      >
        <div className={'list-item__label'}>{label}</div>
        {supportingText && <div className={'list-item__spt-txt'}>{supportingText}</div>}
      </LinearSectionContainer>
      {children}
    </li>
  )
}))

export default ListItem
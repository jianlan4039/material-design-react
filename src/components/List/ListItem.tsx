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
import useRipple from "../Ripple/useRipple";

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  label?: string
  supportingText?: string
  disabled?: boolean
  url?: string
  interactive?: boolean
  icon?: ReactNode,
  trailingIcon?: ReactNode
}

export interface ListItemHandle extends HTMLAttributes<HTMLLIElement> {
  root?: HTMLLIElement | null
  body?: HTMLDivElement | null
}

const ListItem = forwardRef<ListItemHandle, ListItemProps>((props, ref) => {
  const {
    children,
    icon,
    trailingIcon,
    label,
    supportingText,
    disabled,
    url,
    interactive = true,
    className,
    onMouseOver,
    onMouseOut,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
    ...rest
  } = props

  const rootRef = useRef<HTMLLIElement>(null);
  const contentRef = useRef<HTMLDivElement>(null)
  const [isTopLayout, setIsTopLayout] = useState<boolean>(false)

  const [rippleProps, ripple] = useRipple<HTMLLIElement>({
    onMouseOver, onMouseOut, onMouseDown, onMouseUp, onTouchStart, onTouchEnd
  })

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
      {...rippleProps}
      {...rest}
    >
      {interactive && ripple}
      <LinearSectionContainer
        ref={contentRef}
        start={icon}
        end={trailingIcon}
      >
        <div className={'list-item__label'}>{label}</div>
        {supportingText && <div className={'list-item__spt-txt'}>{supportingText}</div>}
      </LinearSectionContainer>
      {children}
    </li>
  )
})

export default ListItem
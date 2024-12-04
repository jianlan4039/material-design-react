import React, {
  HTMLAttributes,
  LiHTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState, useMemo
} from 'react'
import LinearSectionContainer from "../Container/LinearSectionContainer/LinearSectionContainer";
import './ListItem.scss'
import c from 'classnames'
import useRipple from "../Ripple/useRipple";

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  headline?: string
  supportingText?: string
  disabled?: boolean
  interactive?: boolean
  icon?: ReactNode,
  trailingIcon?: ReactNode
}

export interface ListItemHandle extends HTMLAttributes<HTMLLIElement> {
  container?: HTMLLIElement | null
  child?: HTMLDivElement | null
}

const ListItem = forwardRef<ListItemHandle, ListItemProps>((props, ref) => {
  const {
    children,
    icon,
    trailingIcon,
    headline,
    supportingText,
    disabled,
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

  const containerRef = useRef<HTMLLIElement>(null);
  const childRef = useRef<HTMLDivElement>(null)
  const [isTopLayout, setIsTopLayout] = useState<boolean>(false)

  const [rippleProps, ripple] = useRipple<HTMLLIElement>({
    onMouseOver, onMouseOut, onMouseDown, onMouseUp, onTouchStart, onTouchEnd
  })

  useImperativeHandle(ref, () => ({
    container: containerRef.current,
    child: childRef.current
  }))

  useEffect(() => {
    containerRef.current && setIsTopLayout(containerRef.current.getBoundingClientRect().height >= 88)
  }, [containerRef.current]);

  return (
    <li
      ref={containerRef}
      className={c('list-item', className,
        {
          'two-line-height': supportingText,
          'top-layout': isTopLayout,
          'disabled': disabled
        })}
      {...rippleProps}
      {...rest}
    >
      {!disabled && interactive && ripple}
      <LinearSectionContainer
        ref={childRef}
        start={icon}
        end={trailingIcon}
      >
        {headline && <div className={'list-item__label'}>{headline}</div>}
        {supportingText && <div className={'list-item__spt-txt'}>{supportingText}</div>}
        {children}
      </LinearSectionContainer>
    </li>
  )
})

export default ListItem
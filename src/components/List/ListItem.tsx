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
    headline,
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
    const element = rootRef.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      const height = element.getBoundingClientRect().height;
      setIsTopLayout(height >= 88);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <li
      ref={rootRef}
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
        ref={contentRef}
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
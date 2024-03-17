import React, {HTMLAttributes, MouseEvent as ReactMouseEvent, ReactNode, useEffect, useRef} from 'react'
import c from 'classnames'

export interface TextFieldContainerProps extends HTMLAttributes<HTMLDivElement>{
  children?: ReactNode
  onMouseDownOutside?: (e: ReactMouseEvent) => void
}

export default function TextFieldContainer(props: TextFieldContainerProps) {
  const {
    children,
    className,
    onMouseDownOutside,
    ...rest
  } = props

  const rootRef = useRef<HTMLDivElement>(null);

  const mouseDownHandler = (e: ReactMouseEvent) => {
    onMouseDownOutside?.(e)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
      mouseDownHandler(event as unknown as React.MouseEvent<HTMLDivElement>)
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [rootRef]);

  return (
    <div
      ref={rootRef}
      className={c('nd-text-field-container', className)}
      {...rest}
    >
      {children}
    </div>
  )
}
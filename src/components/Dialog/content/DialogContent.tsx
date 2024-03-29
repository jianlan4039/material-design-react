import React, {forwardRef, HTMLAttributes, ReactNode, useImperativeHandle, useRef} from 'react'
import Divider from "../../Divider/Divider";
import c from 'classnames'

export interface DialogContentProps {
  children?: ReactNode
  icon?: ReactNode
  headline?: ReactNode
  supportingText?: ReactNode
  actions?: ReactNode
}

export interface InnerRefHandle extends React.HTMLProps<HTMLDivElement> {
  containerRef: () => HTMLDivElement
  headlineRef: () => HTMLDivElement
  contentRef: () => HTMLDivElement
  actionRef: () => HTMLDivElement
}

const DialogContent = forwardRef<InnerRefHandle, DialogContentProps>((props, ref) => {
  const {
    children,
    icon,
    headline,
    supportingText,
    actions,
    ...rest
  } = props


  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    containerRef: () => containerRef.current!,
    headlineRef: () => headlineRef.current!,
    contentRef: () => contentRef.current!,
    actionRef: () => actionRef.current!
  }))

  return (
    <div ref={containerRef} className={'nd-dialog-container'} {...rest}>
      <div ref={headlineRef} className={c('nd-dialog-header', {'nd-with-icon': icon})}>
        {icon && <span className="nd-dialog-header__icon">{icon}</span>}
        {headline && <h2 className="nd-dialog-header__headline">{headline}</h2>}
        {supportingText && <p className="nd-dialog-header__supporting-text">{supportingText}</p>}
        <Divider></Divider>
      </div>
      <div ref={contentRef} className="nd-dialog-content">
        {children}
      </div>
      <div ref={actionRef} className={"nd-dialog-actions"}>
        <Divider></Divider>
        <div className={'nd-dialog-actions__actions-slot'}>
          {actions}
        </div>
      </div>
    </div>
  )
})

export default DialogContent
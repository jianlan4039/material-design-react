import React, {forwardRef, ReactNode} from 'react'
import Divider from "../../Divider/Divider";

export interface DialogContentProps {
  children?: ReactNode
  icon?: ReactNode
  headline?: ReactNode
  supportText?: ReactNode
  footer?: ReactNode
}

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>((props: DialogContentProps, ref) => {
  const {
    children,
    icon,
    headline,
    supportText,
    footer,
    ...rest
  } = props

  return (
    <div ref={ref} className={'nd-dialog__content-container'}>
      {children}
      {/*<span className={'nd-dialog__icon'}>*/}
      {/*  {icon}*/}
      {/*</span>*/}
      {/*<span className="nd-dialog__headline">*/}
      {/*    {headline}*/}
      {/*  </span>*/}
      {/*<span className="nd-dialog__support-text">*/}
      {/*    {supportText}*/}
      {/*  </span>*/}
      {/*<Divider></Divider>*/}
      {/*<div className={'nd-dialog__content'}>*/}
      {/*  {children}*/}
      {/*</div>*/}
      {/*<Divider></Divider>*/}
      {/*<div className="nd-dialog__action">*/}
      {/*  {footer}*/}
      {/*</div>*/}
    </div>
  )
})

export default DialogContent
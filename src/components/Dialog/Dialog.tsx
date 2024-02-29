import React, {forwardRef, ReactNode, useEffect, useRef, useState, MouseEvent as ReactMouseEvent, FormEvent} from 'react'
import DialogContent, {DialogContentProps, InnerRefHandle} from "./content/DialogContent";
import {
  DIALOG_DEFAULT_OPEN_ANIMATION,
  DIALOG_DEFAULT_CLOSE_ANIMATION,
  DialogAnimation,
  DialogAnimationArgs
} from './content/animation'
import './Dialog.scss'
import c from "classnames";

export interface DialogProps extends React.DialogHTMLAttributes<HTMLDialogElement>, DialogContentProps {
  children?: ReactNode
  show?: boolean
  stayOpenOnOutsideClick?: boolean
  onClose?: () => void
}

const Dialog = forwardRef((props: DialogProps, ref) => {
  const {
    children,
    show: _show = false,
    stayOpenOnOutsideClick = false,
    onClose,
    icon,
    supportingText,
    actions,
    headline,
    onSubmit,
    ...rest
  } = props

  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<InnerRefHandle>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(_show)

  const animateDialog = async (animation: DialogAnimation) => {
    if (!dialogRef.current || !scrimRef.current || !containerRef.current) {
      return;
    }

    const {
      container: containerAnimate,
      dialog: dialogAnimate,
      scrim: scrimAnimate,
      headline: headlineAnimate,
      content: contentAnimate,
      actions: actionsAnimate,
    } = animation;

    const elementAndAnimation: [HTMLElement, DialogAnimationArgs[]][] = [
      [dialogRef.current, dialogAnimate ?? []],
      [scrimRef.current, scrimAnimate ?? []],
      [containerRef.current.containerRef(), containerAnimate ?? []],
      [containerRef.current.headlineRef(), headlineAnimate ?? []],
      [containerRef.current.contentRef(), contentAnimate ?? []],
      [containerRef.current.actionRef(), actionsAnimate ?? []],
    ];

    const animations = [];
    for (const [element, animation] of elementAndAnimation) {
      for (const animateArgs of animation) {
        animations.push(element.animate(...animateArgs));
      }
    }
    await Promise.all(animations.map((animation) => animation.finished));
  }

  const openDialog = () => {
    if (!dialogRef.current) {
      return
    }
    setShow(true)
    dialogRef.current.showModal()
    void animateDialog(DIALOG_DEFAULT_OPEN_ANIMATION)
  }

  const closeDialog = async () => {
    if (!dialogRef.current) {
      return
    }
    await animateDialog(DIALOG_DEFAULT_CLOSE_ANIMATION)
    dialogRef.current.close()
    setShow(false)
    onClose?.()
  }

  const rootClickHandler = (e: ReactMouseEvent) => {
    if (stayOpenOnOutsideClick || !dialogRef.current) {
      return
    }
    const {clientX, clientY} = e
    const dialogRect = dialogRef.current.getBoundingClientRect()
    if (clientX < dialogRect.x || clientX > dialogRect.right || clientY < dialogRect.y || clientY > dialogRect.bottom) {
      void closeDialog()
    }
  }

  const submitHandler = (e: FormEvent<HTMLDialogElement>) => {
    e.preventDefault()
    void closeDialog()
    onSubmit?.(e)
  }

  useEffect(() => {
    if (_show) {
      openDialog()
    } else {
      void closeDialog()
    }
  }, [_show]);

  useEffect(() => {
    const escKeyDownHandler = (e: KeyboardEvent) => {
      if (dialogRef.current && dialogRef.current.open && e.key === 'Escape') {
        e.preventDefault()
        void closeDialog()
      }
    }
    document.addEventListener('keydown', escKeyDownHandler)
    return () => {
      document.removeEventListener('keydown', escKeyDownHandler)
    }
  });

  return (
    <div ref={rootRef} className={c('nd-dialog-host', {'nd-show': show})} onClick={rootClickHandler}>
      <div ref={scrimRef} className={c("nd-dialog-scrim", {'nd-show': show})}></div>
      <dialog ref={dialogRef} className={'nd-dialog'} onSubmit={submitHandler} {...rest}>
        <DialogContent ref={containerRef} headline={headline} icon={icon} supportingText={supportingText} actions={actions}>
          {children}
        </DialogContent>
      </dialog>
    </div>
  )
})

export default Dialog
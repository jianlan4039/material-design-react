import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
  FormEvent, useImperativeHandle, HTMLAttributes
} from 'react'
import DialogContent, {DialogContentProps, InnerRefHandle} from "./internal/DialogContent";
import {
  DIALOG_DEFAULT_OPEN_ANIMATION,
  DIALOG_DEFAULT_CLOSE_ANIMATION,
  DialogAnimation,
  DialogAnimationArgs
} from './internal/animation'
import './Dialog.scss'
import c from "classnames";

export interface DialogProps extends DialogContentProps {
  children?: ReactNode
  show?: boolean
  stayOpenOnOutsideClick?: boolean
  close?: () => void
  closed?: () => void
  open?: () => void
  opened?: () => void
  quick?: boolean
  returnValue?: string
  onSubmit?: (e: FormEvent<HTMLDialogElement>) => void
}

export interface DialogHandle extends HTMLAttributes<HTMLDialogElement> {
  root?: HTMLDivElement | null
  dialog?: HTMLDialogElement | null
}

const Dialog = forwardRef<DialogHandle, DialogProps>((props, ref) => {
  const {
    children,
    show = false,
    stayOpenOnOutsideClick = false,
    close,
    closed,
    open,
    opened,
    icon,
    supportingText,
    actions,
    headline,
    onSubmit,
    quick,
    returnValue,
    headerDivider,
    footerDivider,
    ...rest
  } = props

  const rootRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<InnerRefHandle>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(show)

  const animateDialog = async (animation: DialogAnimation) => {
    if (!dialogRef.current || !scrimRef.current || !containerRef.current || quick) {
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

    const animations: Animation[] = [];
    for (const [element, animation] of elementAndAnimation) {
      for (const animateArgs of animation) {
        animations.push(element.animate(...animateArgs));
      }
    }

    return await Promise.all(animations.map((animation) => animation.finished));
  }

  const openDialog = async () => {
    if (!dialogRef.current) {
      return
    }
    setIsShow(true)
    dialogRef.current.showModal()
    open?.()
    await animateDialog(DIALOG_DEFAULT_OPEN_ANIMATION)
    opened?.()
  }

  const closeDialog = async () => {
    if (!dialogRef.current) {
      return
    }
    close?.()
    await animateDialog(DIALOG_DEFAULT_CLOSE_ANIMATION)
    closed?.()
    dialogRef.current.close()
    setIsShow(false)
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
    if (dialogRef.current && returnValue) {
      dialogRef.current.returnValue = returnValue
    }
  }, [dialogRef]);

  useEffect(() => {
    show ? !isShow && openDialog() : isShow && closeDialog()
  }, [show]);

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

  useImperativeHandle(ref, () => ({
    root: rootRef.current,
    dialog: dialogRef.current
  }))

  return (
    <div ref={rootRef} className={c('nd-dialog-host', {'nd-show': isShow, 'quick': quick})} onClick={rootClickHandler}>
      <div ref={scrimRef} className={c("nd-dialog-scrim", {'nd-show': isShow})}></div>
      <dialog ref={dialogRef} className={'nd-dialog'} onSubmit={submitHandler} {...rest}>
        <DialogContent
          ref={containerRef}
          headline={headline}
          icon={icon}
          supportingText={supportingText}
          actions={actions}
          headerDivider={headerDivider}
          footerDivider={footerDivider}
        >
          {children}
        </DialogContent>
      </dialog>
    </div>
  )
})

export default Dialog
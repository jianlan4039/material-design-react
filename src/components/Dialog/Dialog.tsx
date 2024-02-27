import React, {ReactNode, useEffect, useRef, useState} from 'react'
import DialogContent, {DialogContentProps} from "./content/DialogContent";
import {DialogAnimation, DialogAnimationArgs} from "./content/animation";
import {DIALOG_DEFAULT_OPEN_ANIMATION, DIALOG_DEFAULT_CLOSE_ANIMATION} from "./content/animation";
import './Dialog.scss'
import cln from "classnames";

export interface DialogProps extends DialogContentProps {
  children?: ReactNode
  show?: boolean,
  onClose?: () => void
}

export default function Dialog(props: DialogProps) {
  const {
    children,
    show: _show = false,
    onClose,
    ...rest
  } = props

  const ref = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const scrim = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const headline = useRef<HTMLElement>();
  const content = useRef<HTMLElement>();
  const actions = useRef<HTMLElement>();

  const [show, setShow] = useState<boolean>(_show)

  async function animateDialog(animation: DialogAnimation) {
    const {
      container: containerAnimate,
      dialog: dialogAnimate,
      scrim: scrimAnimate,
      headline: headlineAnimate,
      content: contentAnimate,
      actions: actionsAnimate,
    } = animation;

    const elementAndAnimation: [HTMLElement | null | undefined, DialogAnimationArgs[]][] = [
      [dialog.current, dialogAnimate ?? []],
      [scrim.current, scrimAnimate ?? []],
      [container.current, containerAnimate ?? []],
      [headline.current, headlineAnimate ?? []],
      [content.current, contentAnimate ?? []],
      [actions.current, actionsAnimate ?? []],
    ];

    const animations = [];
    for (const [element, animation] of elementAndAnimation) {
      if (element) {
        for (const animateArgs of animation) {
          animations.push(element.animate(...animateArgs));
        }
      }
    }
    await Promise.all(animations.map((animation) => animation.finished));
  }

  const openDialog = (dialogEl: HTMLDialogElement) => {
    setShow(true)
    dialogEl.showModal()
    void animateDialog(DIALOG_DEFAULT_OPEN_ANIMATION)
  }

  const closeDialog = (dialogEl: HTMLDialogElement) => {
    animateDialog(DIALOG_DEFAULT_CLOSE_ANIMATION).then(() => {
      setShow(false)
      dialogEl.close()
    })
  }

  useEffect(() => {
    if (dialog.current) {
      if (_show) {
        openDialog(dialog.current)
      } else {
        closeDialog(dialog.current)
      }
    }
  }, [dialog, _show]);

  useEffect(() => {
    if (dialog.current) {
      headline.current = dialog.current.querySelector('span.nd-dialog__headline') as HTMLElement
      content.current = dialog.current.querySelector('div.nd-dialog__content') as HTMLElement
      actions.current = dialog.current.querySelector('div.nd-dialog__action') as HTMLElement
    }
  }, [dialog]);


  return (
    <div className={cln('nd-dialog__container', {'nd-show': show})}>
      <div ref={scrim} className={'nd-dialog__scrim'}>123</div>
      <dialog className={'nd-dialog'} ref={dialog}>
        <DialogContent ref={container} {...rest}>
          {children}
        </DialogContent>
      </dialog>
    </div>
  )
}
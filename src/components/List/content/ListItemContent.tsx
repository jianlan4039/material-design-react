import React, {ReactNode, useEffect, useRef, useState} from 'react'
import './ListItemContent.scss'
import c from 'classnames'

export interface ListItemContentProps {
  children?: ReactNode
  leading?: ReactNode
  trailing?: ReactNode
  label?: string
  supportingText?: string
}

export default function ListItemContent(props: ListItemContentProps) {
  const {
    children,
    leading,
    trailing,
    label,
    supportingText,
    ...rest
  } = props

  const rootRef = useRef<HTMLDivElement>(null);
  const leadingRef = useRef<HTMLSpanElement>(null);

  const [alignVerticalStart, setAlignVerticalStart] = useState<boolean>(false)
  const [leadingWidth, setLeadingWidth] = useState<number>(0)

  useEffect(() => {
    if (rootRef.current) {
      if (rootRef.current.getBoundingClientRect().height > 72) {
        setAlignVerticalStart(true)
      }
    }

    if (leadingRef.current) {
      setLeadingWidth(leadingRef.current.getBoundingClientRect().width)
    }
  }, [rootRef, leadingRef]);

  return (
    <div
      ref={rootRef}
      className={c('nd-list-item', {
        'with-leading': leading,
        'with-trailing': trailing,
        'with-supporting-text': supportingText,
        'align-items-start': alignVerticalStart,
        'without-leading-space': leadingWidth > 64
      })}
      {...rest}
    >
      <span ref={leadingRef} className={'nd-list-item__leading'}>{leading}</span>
      <div className={'nd-list-item__content'}>
        <span className={'nd-list-item__content__label'}>{label}</span>
        <span className={'nd-list-item__content__supporting-text'}>{supportingText}</span>
      </div>
      <span className={'nd-list-item__trailing'}>{trailing}</span>
    </div>
  )
}
import React, {ReactNode} from 'react'
import './SupportingText.scss'
import c from 'classnames'

export interface SupportingTextProps {
  content?: string
  trailing?: string
}

export default function SupportingText(props: SupportingTextProps) {
  const {
    content,
    trailing,
  } = props

  return (
    <div className={'nd-field-supporting-text'}>
      <div className={'nd-field-supporting-text__content'}>{content}</div>
      {trailing && <div className={'nd-field-supporting-text__trailing'}>{trailing}</div>}
    </div>
  )
}
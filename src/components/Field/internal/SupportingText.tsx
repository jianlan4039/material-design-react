import React from 'react'
import './SupportingText.scss'

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
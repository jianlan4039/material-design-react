import React, {ReactNode} from 'react'
import './SupportingText.scss'
import c from 'classnames'

export interface SupportingTextProps {
  children?: ReactNode
  trailing?: ReactNode
}

export default function SupportingText(props: SupportingTextProps) {
  const {
    children,
    trailing,
  } = props

  return (
    <div className={'nd-field-supporting-text'}>
      <div className={'nd-field-supporting-text__content'}>{children}</div>
      {trailing && <div className={'nd-field-supporting-text__trailing'}>{trailing}</div>}
    </div>
  )
}
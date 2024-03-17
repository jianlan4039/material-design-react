import React, {ReactNode} from 'react'
import './FieldOutline.scss'
import c from 'classnames'

export interface FieldOutlineProps {
  children?: ReactNode
  label?: string
  supportingText?: string
}

export default function FieldOutline(props: FieldOutlineProps) {
  const {
    children,
    label,
    supportingText,
    ...rest
  } = props

  return (
    <div className={c('nd-field-outline', {'with-label': label})}>
      <div className={'nd-field-outline__start'}></div>
      <div className={'nd-field-outline__notch'}>
        <span className={'nd-field-outline__panel-inactive'}></span>
        <span className={'nd-field-outline__panel-active'}></span>
        <span className={'nd-field-outline__notch__label'}>{label}</span>
      </div>
      <div className={'nd-field-outline__end'}></div>
      <div className={'nd-supporting-text'}>{supportingText}</div>
    </div>
  )
}
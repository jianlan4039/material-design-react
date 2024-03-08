import React, {ReactNode} from 'react'

export interface SupportingTextProps {
  children?: ReactNode
}

export default function SupportingText(props: SupportingTextProps) {
  const {
    children,
    ...rest
  } = props

  return (
    <div className={'nd-field__supporting-text'}>
      {children}
    </div>
  )
}